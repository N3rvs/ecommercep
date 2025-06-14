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
import { Card } from '@/components/ui/card';


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
      console.log("Actualizando producto:", { ...editingProduct, ...productForm });
    } else {
      // Add new product
      const newProduct = { ...productForm, id: `prod-${Date.now()}`, images: productForm.images || [] } as Product;
      setProducts(prev => [newProduct, ...prev]);
      console.log("Añadiendo nuevo producto:", newProduct);
    }
    setIsFormOpen(false);
    setProductForm(initialFormState); // Reset form
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar este producto?")) { // Changed from 确定要删除此产品吗？
      setProducts(prev => prev.filter(p => p.id !== productId));
      console.log("Eliminando producto:", productId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Gestión de Productos</h1>
        <Button onClick={() => handleOpenForm()}>
          <PlusCircle className="mr-2 h-5 w-5" /> Añadir Producto
        </Button>
      </div>

      <div className="relative">
        <Input
          type="search"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Editar Producto' : 'Añadir Nuevo Producto'}</DialogTitle>
            <DialogDescription>
              {editingProduct ? 'Modificar la información del producto.' : 'Complete la siguiente información para añadir un nuevo producto.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4 py-2">
            <div>
              <Label htmlFor="name">Nombre del Producto</Label>
              <Input id="name" name="name" value={productForm.name || ''} onChange={handleFormChange} required />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea id="description" name="description" value={productForm.description || ''} onChange={handleFormChange} />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="price">Precio</Label>
                    <Input id="price" name="price" type="number" value={productForm.price || 0} onChange={handleFormChange} required />
                </div>
                <div>
                    <Label htmlFor="stock">Inventario</Label>
                    <Input id="stock" name="stock" type="number" value={productForm.stock || 0} onChange={handleFormChange} required />
                </div>
            </div>
            <div>
              <Label htmlFor="category">Categoría</Label>
              <Input id="category" name="category" value={productForm.category || ''} onChange={handleFormChange} />
            </div>
            
            <div className="space-y-2">
              <Label>Imágenes del Producto</Label>
              {(productForm.images || []).map((img, index) => (
                <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                  <Input placeholder="URL de la Imagen" value={img.url} onChange={(e) => handleImageChange(index, 'url', e.target.value)} />
                  <Input placeholder="Pista de la Imagen (IA)" value={img.hint} onChange={(e) => handleImageChange(index, 'hint', e.target.value)} />
                  {index === (productForm.images?.length || 0) - 1 && (
                    <Button type="button" size="icon" variant="outline" onClick={addImageField}><PlusCircle className="h-4 w-4" /></Button>
                  )}
                </div>
              ))}
              {(!productForm.images || productForm.images.length === 0) && (
                 <Button type="button" variant="outline" onClick={addImageField}>Añadir Imagen</Button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Input type="checkbox" id="featured" name="featured" checked={productForm.featured || false} onChange={handleFormChange} className="h-4 w-4"/>
              <Label htmlFor="featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Producto Destacado
              </Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancelar</Button>
              <Button type="submit">{editingProduct ? 'Guardar Cambios' : 'Añadir Producto'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="w-[100px]">Precio</TableHead>
              <TableHead className="w-[100px]">Inventario</TableHead>
              <TableHead className="w-[100px]">Estado</TableHead>
              <TableHead className="w-[80px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? filteredProducts.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image src={product.images[0]?.url || 'https://placehold.co/60x60.png'} alt={product.name} width={48} height={48} className="rounded object-cover aspect-square" data-ai-hint={product.images[0]?.hint || 'imagen producto'} />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge variant={product.stock > 0 ? 'secondary' : 'destructive'}>
                    {product.stock > 0 ? 'En stock' : 'Agotado'}
                  </Badge>
                  {product.featured && <Badge className="ml-1">Destacado</Badge>}
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
                        <Edit className="mr-2 h-4 w-4" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert(`Viendo ${product.name}`)}>
                        <Eye className="mr-2 h-4 w-4" /> Ver
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No se encontraron productos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
