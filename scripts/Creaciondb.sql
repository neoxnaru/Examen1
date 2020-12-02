USE master
GO
  
IF EXISTS (
    SELECT name
        FROM sys.databases
        WHERE name = N'Supermercado2'
)
DROP DATABASE  Supermercado2
Go

CREATE DATABASE    Supermercado2
GO

Use    Supermercado2
  
IF OBJECT_ID('dbo.Catalogo_C', 'U') IS NOT NULL
DROP TABLE dbo.Catalogo_C
GO
      
CREATE TABLE dbo.Catalogo_C
(
    cuenta_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),       
    cuenta [NVARCHAR](100) NOT NULL,
    saldo [INT] NOT NULL
          
    
);
GO


  
  
IF OBJECT_ID('dbo.Categoria', 'U') IS NOT NULL
DROP TABLE dbo.Categoria
GO
      
CREATE TABLE dbo.Categoria
(
    categoria_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),       
    nombre [NVARCHAR](50) NOT NULL,
    descripcion [NVARCHAR](200) NOT NULL
          
);
GO

  
  
IF OBJECT_ID('dbo.Informarcion_G', 'U') IS NOT NULL
DROP TABLE dbo.Informarcion_G
GO
      
CREATE TABLE dbo.Informarcion_G
(
    Informarcion_GId INT NOT NULL PRIMARY KEY IDENTITY(1,1),       
    telefono [NVARCHAR](50) NOT NULL,
    direccion [NVARCHAR](50) NOT NULL
          
);
GO

  
  
IF OBJECT_ID('dbo.Proveedor', 'U') IS NOT NULL
DROP TABLE dbo.Proveedor
GO
      
CREATE TABLE dbo.Proveedor
(
    proveedor_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),       
    nombre [NVARCHAR](200) NOT NULL,
    empresa [NVARCHAR](150) NOT NULL,
    Informarcion_GId [INT] NOT NULL
          
    CONSTRAINT fk_Proveedor FOREIGN KEY (Informarcion_GId) REFERENCES Informarcion_G(Informarcion_GId)
);
GO

  
  
IF OBJECT_ID('dbo.Producto', 'U') IS NOT NULL
DROP TABLE dbo.Producto
GO
      
CREATE TABLE dbo.Producto
(
    producto_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),       
    nombre [NVARCHAR](200) NOT NULL,
    tipoa [NVARCHAR](200) NOT NULL,
    costo_compra [INT] NOT NULL,
    precio_venta [INT] NOT NULL,
    existencias [INT] NOT NULL,
    proveedor_id [INT] NOT NULL,
    categoria_id [INT] NOT NULL
          
    CONSTRAINT fk_Producto1 FOREIGN KEY (proveedor_id) REFERENCES Proveedor(proveedor_id),
    CONSTRAINT fk_Producto2 FOREIGN KEY (categoria_id) REFERENCES Categoria(categoria_id)

);
GO

  
  
IF OBJECT_ID('dbo.Cuenta_Cont', 'U') IS NOT NULL
DROP TABLE dbo.Cuenta_Cont
GO
      
CREATE TABLE dbo.Cuenta_Cont
(
    cuentaCont_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),       
    cuenta_id [INT] NOT NULL,
    debe [INT] NOT NULL, 
    haber [INT] NOT NULL,
    concepto [NVARCHAR](50) NOT NULL,
    fecha [NVARCHAR](50) NOT NULL
          
    CONSTRAINT fk_Cuenta_Cont FOREIGN KEY (cuenta_id) REFERENCES Catalogo_C(cuenta_id)
);
GO

  
  
IF OBJECT_ID('dbo.Cliente', 'U') IS NOT NULL
DROP TABLE dbo.Cliente
GO
      
CREATE TABLE dbo.Cliente
(
    cliente_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),       
    nombre [NVARCHAR](50) NOT NULL,
    credito [INT] NOT NULL, 
    saldo [INT] NOT NULL,
    Informarcion_GId [INT] NOT NULL
          
    CONSTRAINT fk_Cliente FOREIGN KEY (Informarcion_GId) REFERENCES Informarcion_G(Informarcion_GId)
);
GO



  
  
IF OBJECT_ID('dbo.Factura', 'U') IS NOT NULL
DROP TABLE dbo.Factura
GO
      
CREATE TABLE dbo.Factura
(
    factura_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),       
    cliente_id [INT] NOT NULL,
    fecha [NVARCHAR](50) NOT NULL,
    total [INT] NOT NULL
          
    CONSTRAINT fk_Factura FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id)
);
GO

  
  
IF OBJECT_ID('dbo.Pago', 'U') IS NOT NULL
DROP TABLE dbo.Pago
GO
      
CREATE TABLE dbo.Pago
(
    pago_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),       
    cliente_id [INT] NOT NULL,
    cuentaCont_id [INT] NOT NULL
          
    CONSTRAINT fk_Pago1 FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id),
    CONSTRAINT fk_Pago2 FOREIGN KEY (cuentaCont_id) REFERENCES  Cuenta_Cont(cuentaCont_id)
);
GO

  
  
IF OBJECT_ID('dbo.Pedidos', 'U') IS NOT NULL
DROP TABLE dbo.Pedidos
GO
      
CREATE TABLE dbo.Pedidos
(
    pedido_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),       
    proveedor_id [INT] NOT NULL,
    fecha_emision [NVARCHAR](50) NOT NULL,
    fecha_entrega [NVARCHAR](50) NOT NULL,
    monto_total [INT] NOT NULL
        
    CONSTRAINT fk_Pedidos FOREIGN KEY (proveedor_id) REFERENCES  Proveedor(proveedor_id)
);
GO

  
  
IF OBJECT_ID('dbo.FacturaDet', 'U') IS NOT NULL
DROP TABLE dbo.FacturaDet
GO
      
CREATE TABLE dbo.FacturaDet
(
    facturaDetalle_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),       
    factura_id [INT] NOT NULL,
    producto_id [INT] NOT NULL,
    cantidad [INT] NOT NULL,
    precio [INT] NOT NULL
          
    CONSTRAINT fk_FacturaDetalle1 FOREIGN KEY (factura_id) REFERENCES  Factura(factura_id),
    CONSTRAINT fk_FacturaDetalle2 FOREIGN KEY (producto_id) REFERENCES  Producto(producto_id)
    
);
GO

  
  
IF OBJECT_ID('dbo.PedidoDet', 'U') IS NOT NULL
DROP TABLE dbo.PedidoDet
GO
      
CREATE TABLE dbo.PedidoDet
(
    pedidoDet_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),       
    producto_id [INT] NOT NULL,
    pedido_id [INT] NOT NULL,
    costo_unitario [INT] NOT NULL,
    cantidad [INT] NOT NULL
          
    CONSTRAINT fk_PedidoDet1 FOREIGN KEY (producto_id) REFERENCES  Producto(producto_id),
    CONSTRAINT fk_PedidoDet2 FOREIGN KEY (pedido_id) REFERENCES  Pedidos(pedido_id)
);
GO

      
INSERT INTO Catalogo_C
(       
    [cuenta], [saldo]
)
VALUES
(       
  'caja1', 5000
)
     
GO


      
INSERT INTO Categoria
(       
  [nombre], [descripcion]
)
VALUES
(       
  'Cafe', 'Pesado'
),
(       
  'Mar', 'Pescado'
)
     
GO


      
INSERT INTO Informarcion_G
(       
    [telefono], [direccion]
)
VALUES
(       
 '33186449', '2 Ave 6 Calle'
)
     
GO


      
INSERT INTO Proveedor
(       
 [nombre], [empresa], [Informarcion_GId]
)
VALUES
(       
 'Jose', 'Mortadeli', 1
 )
     
GO



      
INSERT INTO Producto
(       
 [nombre], [tipoa] , [costo_compra], [precio_venta], [existencias], [proveedor_id], [categoria_id]
)
VALUES
(       
 'Cafe', '30%', 55, 80, 20, 1, 1 
)
     
GO


      
INSERT INTO Cuenta_Cont

(       
 [cuenta_id], [debe], [haber], [concepto],  [fecha]
)
VALUES
(       
 1, 150,400, 'pago', '11/23/2020'
),
(     
 1, 200, 350, 'abono', '11/23/2020'
)
     
GO


      
INSERT INTO Cliente


(       
 [nombre], [credito], [saldo], [Informarcion_GId]
)
VALUES
(       
 'Carlos', 100, 250 ,1 
)

     
GO


      
INSERT INTO Factura
(       
 [cliente_id], [fecha], [total]
)
VALUES
(       
 1, '11/23/2020', 150
)

     
GO


      
INSERT INTO Pago
(       
 [cliente_id], [cuentaCont_id]
)
VALUES
(       
 1, 1
)

     
GO


      
INSERT INTO Pedidos

(       
 [proveedor_id], [fecha_emision], [fecha_entrega], [monto_total]
)
VALUES
(       
 1, '1/5/2020', '11/23/2020', 150
) 

     
GO


      
INSERT INTO FacturaDet

(       
 [factura_id], [producto_id], [cantidad], [precio]
)
VALUES
(       
 1, 1, 2, 58
)
     
GO


      
INSERT INTO PedidoDet

(       
 [producto_id], [pedido_id], [costo_unitario], [cantidad]
)
VALUES
(       
 1, 1, 4, 100
)
  
GO

  
SELECT * FROM dbo.Catalogo_C
GO

 
SELECT * FROM dbo.Categoria
GO

 
SELECT * FROM dbo.Informarcion_G
GO

 
SELECT * FROM dbo.Proveedor
GO

 
SELECT * FROM dbo.Producto
GO

 
SELECT * FROM dbo.Cuenta_Cont
GO

 
SELECT * FROM dbo.Cliente
GO

 
SELECT * FROM dbo.Factura
GO

 
SELECT * FROM dbo.Pago
GO

 
SELECT * FROM dbo.Pedidos
GO

 
SELECT * FROM dbo.FacturaDet
GO

 
SELECT * FROM dbo.PedidoDet
GO


Select * from Cliente
Select * from Pago

SELECT Cliente.nombre, Cliente.credito ,Cliente.Saldo, Pago.pago_id 
FROM Pago 
join Cliente on Pago.cliente_id = Cliente.cliente_id
WHERE Cliente.saldo BETWEEN Cliente.credito - 100 AND Cliente.credito

Select * from Cliente
Select * from Factura
Select * from FacturaDet
Select * from Producto

SELECT Cliente.nombre, Factura.fecha, Producto.nombre, FacturaDet.precio, 
FacturaDet.cantidad, Factura.total 
FROM Factura
join Cliente on Factura.cliente_id = Cliente.cliente_id 
join FacturaDet on Factura.factura_id = FacturaDet.factura_id 
join Producto on FacturaDet.producto_id = Producto.producto_id