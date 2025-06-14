'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Search, Edit, Trash2, Eye } from 'lucide-react';
import type { Product } from '@/lib/types';
import { productsData } from '@/lib/data'; // Using mock data
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Form state for adding/editing product
const initialFormState: Partial<Product> = {
  name: '',
  description: '',
  price: 0,
  category: '',
  stock: 0,
  featured: false,
  images: [{url: '', hint: ''}],
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>(initialFormState);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenForm = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm(product);
    } else {
      setEditingProduct(null);
      setProductForm(initialFormState);
    }
    setIsFormOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setProductForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value,
    }));
  };
  
  const handleImageChange = (index: number, field: 'url' | 'hint', value: string) => {
    setProductForm(prev => {
      const updatedImages = [...(prev?.images || [])];
      if (updatedImages[index]) {
        updatedImages[index] = { ...updatedImages[index], [field]: value };
      } else {
        updatedImages[index] = { url: '', hint: '', [field]: value };
      }
      return { ...prev, images: updatedImages };
    });
  };

  const addImageField = () => {
    setProductForm(prev => ({ ...prev, images: [...(prev?.images || []), {url: '', hint: ''}] }));
  };


  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API
    if (editingProduct && editingProduct.id) {
      // Update existing product
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...productForm, id: editingProduct.id } as Product : p));
      console.log("Updating product:", { ...editingProduct, ...productForm });
    } else {
      // Add new product
      const newProduct = { ...productForm, id: `prod-${Date.now()}`, images: productForm.images || [] } as Product;
      setProducts(prev => [newProduct, ...prev]);
      console.log("Adding new product:", newProduct);
    }
    setIsFormOpen(false);
    setProductForm(initialFormState); // Reset form
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("确定要删除此产品吗？")) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      console.log("Deleting product:", productId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">产品管理</h1>
        <Button onClick={() => handleOpenForm()}>
          <PlusCircle className="mr-2 h-5 w-5" /> 添加产品
        </Button>
      </div>

      <div className="relative">
        <Input
          type="search"
          placeholder="搜索产品..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? '编辑产品' : '添加新产品'}</DialogTitle>
            <DialogDescription>
              {editingProduct ? '修改产品信息。' : '填写以下信息以添加新产品。'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4 py-2">
            <div>
              <Label htmlFor="name">产品名称</Label>
              <Input id="name" name="name" value={productForm.name || ''} onChange={handleFormChange} required />
            </div>
            <div>
              <Label htmlFor="description">描述</Label>
              <Textarea id="description" name="description" value={productForm.description || ''} onChange={handleFormChange} />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="price">价格</Label>
                    <Input id="price" name="price" type="number" value={productForm.price || 0} onChange={handleFormChange} required />
                </div>
                <div>
                    <Label htmlFor="stock">库存</Label>
                    <Input id="stock" name="stock" type="number" value={productForm.stock || 0} onChange={handleFormChange} required />
                </div>
            </div>
            <div>
              <Label htmlFor="category">类别</Label>
              <Input id="category" name="category" value={productForm.category || ''} onChange={handleFormChange} />
            </div>
            
            <div className="space-y-2">
              <Label>产品图片</Label>
              {(productForm.images || []).map((img, index) => (
                <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                  <Input placeholder="图片 URL" value={img.url} onChange={(e) => handleImageChange(index, 'url', e.target.value)} />
                  <Input placeholder="图片提示 (AI)" value={img.hint} onChange={(e) => handleImageChange(index, 'hint', e.target.value)} />
                  {index === (productForm.images?.length || 0) - 1 && (
                    <Button type="button" size="icon" variant="outline" onClick={addImageField}><PlusCircle className="h-4 w-4" /></Button>
                  )}
                </div>
              ))}
              {(!productForm.images || productForm.images.length === 0) && (
                 <Button type="button" variant="outline" onClick={addImageField}>添加图片</Button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Input type="checkbox" id="featured" name="featured" checked={productForm.featured || false} onChange={handleFormChange} className="h-4 w-4"/>
              <Label htmlFor="featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                特色产品
              </Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>取消</Button>
              <Button type="submit">{editingProduct ? '保存更改' : '添加产品'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">图片</TableHead>
              <TableHead>名称</TableHead>
              <TableHead>类别</TableHead>
              <TableHead className="w-[100px]">价格</TableHead>
              <TableHead className="w-[100px]">库存</TableHead>
              <TableHead className="w-[100px]">状态</TableHead>
              <TableHead className="w-[80px] text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? filteredProducts.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image src={product.images[0]?.url || 'https://placehold.co/60x60.png'} alt={product.name} width={48} height={48} className="rounded object-cover aspect-square" data-ai-hint={product.images[0]?.hint || 'product image'} />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge variant={product.stock > 0 ? 'secondary' : 'destructive'}>
                    {product.stock > 0 ? '有货' : '缺货'}
                  </Badge>
                  {product.featured && <Badge className="ml-1">特色</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenForm(product)}>
                        <Edit className="mr-2 h-4 w-4" /> 编辑
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert(`Viewing ${product.name}`)}>
                        <Eye className="mr-2 h-4 w-4" /> 查看
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        <Trash2 className="mr-2 h-4 w-4" /> 删除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  未找到产品。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
