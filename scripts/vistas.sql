USE Supermercado2
GO



IF EXISTS (
SELECT *
FROM sys.views
  JOIN sys.schemas
  ON sys.views.schema_id = sys.schemas.schema_id
WHERE sys.schemas.name = N'dbo'
  AND sys.views.name = N'vTransaccionesProveedor'
)
DROP VIEW dbo.vTransaccionesProveedor
GO

CREATE VIEW dbo.vTransaccionesProveedor
AS
  SELECT Ped.fecha_entrega, P.nombre, Pro.nombre as 'Producto', D.cantidad, D.costo_unitario
  FROM dbo.Pedidos Ped
    JOIN PedidoDet D on D.pedido_id = Ped.pedido_id
    JOIN Proveedor P on P.proveedor_id = Ped.proveedor_id
    JOIN Producto Pro on Pro.producto_id = D.producto_id

GO

IF EXISTS (
SELECT *
FROM sys.views
  JOIN sys.schemas
  ON sys.views.schema_id = sys.schemas.schema_id
WHERE sys.schemas.name = N'dbo'
  AND sys.views.name = N'vTransaccionesCliente'
)
DROP VIEW dbo.vTransaccionesCliente
GO

CREATE VIEW dbo.vTransaccionesCliente
AS
  SELECT F.Fecha, Cli.Nombre , Pro.Nombre AS 'Producto', DF.Cantidad, DF.Precio, F.total
  FROM Factura F
    INNER JOIN FacturaDet DF ON DF.facturaDetalle_id = F.factura_id
    INNER JOIN Producto Pro ON Pro.producto_id = DF.producto_id
    INNER JOIN Cliente Cli ON Cli.cliente_id = F.cliente_id
GO



IF EXISTS (
SELECT *
FROM sys.views
  JOIN sys.schemas
  ON sys.views.schema_id = sys.schemas.schema_id
WHERE sys.schemas.name = N'dbo'
  AND sys.views.name = N'CategoriasProductos'
)
DROP VIEW dbo.CategoriaProductos
GO

CREATE VIEW dbo.CategoriaProductos
AS
  SELECT Cat.nombre, COUNT(DF.producto_id) AS 'Cantidad de ventas'
  FROM FacturaDet DF
    INNER JOIN Producto Pro ON Pro.producto_id = DF.producto_id
    RIGHT JOIN Categoria Cat ON Cat.categoria_id = Pro.categoria_id
  WHERE DF.producto_id<=5
  GROUP BY Cat.nombre
GO


IF EXISTS (
SELECT *
FROM sys.views
  JOIN sys.schemas
  ON sys.views.schema_id = sys.schemas.schema_id
WHERE sys.schemas.name = N'dbo'
  AND sys.views.name = N'vPrecio30'
)
DROP VIEW dbo.vPrecio30
GO

CREATE VIEW dbo.vPrecio30
AS
  SELECT Prod.Nombre, Prod.tipoa
  FROM Producto Prod
    JOIN Proveedor Prov ON Prod.proveedor_id = Prov.proveedor_id
  WHERE Prod.tipoa = '30%'
GO

IF EXISTS (
SELECT *
FROM sys.views
  JOIN sys.schemas
  ON sys.views.schema_id = sys.schemas.schema_id
WHERE sys.schemas.name = N'dbo'
  AND sys.views.name = N'VistaProveedorPrecio'
)
DROP VIEW dbo.VistaProveedorPrecio
GO

CREATE VIEW dbo.VistaProveedorPrecio
AS
  SELECT Prod.Nombre, Prod.tipoa
  FROM Producto Prod
    JOIN Proveedor Prov ON Prod.proveedor_id = Prov.proveedor_id
  WHERE Prod.tipoa = 'define'
GO


IF EXISTS (
SELECT *
FROM sys.views
  JOIN sys.schemas
  ON sys.views.schema_id = sys.schemas.schema_id
WHERE sys.schemas.name = N'dbo'
  AND sys.views.name = N'VistaClientesPagos'
)
DROP VIEW dbo.VistaClientesPagos
GO

CREATE VIEW dbo.VistaClientesPagos
AS
  SELECT Cli.nombre, Pg.pago_id, Cc.debe, Cc.haber, Cc.fecha
  FROM Cliente Cli
    JOIN Pago Pg ON Pg.cliente_id = Cli.cliente_id
    JOIN Cuenta_Cont Cc ON Cc.cuenta_id = Pg.cuentaCont_id
GO


CREATE VIEW dbo.VistaProductoStock
AS
  SELECT Pro.nombre, Pro.existencias
  FROM Producto Pro
GO

