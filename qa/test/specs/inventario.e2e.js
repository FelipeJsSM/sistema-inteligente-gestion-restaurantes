describe('Flujo de Inventario SIGR', () => {
    it('Debería registrar un nuevo producto y mostrarlo en la tabla', async () => {
        // 1. Iniciar sesión 
        await browser.url('http://localhost:5173/');
        await $('input[type="email"]').setValue('admin@restaurante.com');
        await $('input[type="password"]').setValue('123456');
        await $('button[type="submit"]').click();

        // 2. Esperar a estar en el dashboard y navegar a Inventario
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/dashboard'),
            { timeout: 5000 }
        );
        await browser.url('http://localhost:5173/inventario');

        // 3. Llenar el formulario de inventario
        const inputsTexto = await $$('input[type="text"]');
        const inputsNumero = await $$('input[type="number"]');
        const selectUnidad = await $('select');
        const btnGuardar = await $('button[type="submit"]');

        await inputsTexto[0].setValue('Zanahoria Automatizada'); // Nombre
        await inputsTexto[1].setValue('Vegetales'); // Categoría
        await selectUnidad.selectByVisibleText('Libra'); // Select
        await inputsNumero[0].setValue('20'); // Cantidad actual
        await inputsNumero[1].setValue('5'); // Stock mínimo
        
        await btnGuardar.click();

        // 4. Validar que el producto aparezca en la tabla
        await browser.pause(1000); // Breve pausa para el renderizado de React
        const cuerpoTabla = await $('tbody');
        const textoTabla = await cuerpoTabla.getText();

        if (!textoTabla.includes('Zanahoria Automatizada')) {
            throw new Error('Fallo crítico: El producto automatizado no se renderizó en la tabla.');
        }
    });
});