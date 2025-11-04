// --- Código JavaScript para el nodo Process Data ---

const processedData = []; // Array para almacenar los datos transformados. (Array to store transformed data.)

// Iteramos sobre todos los ítems recibidos del nodo anterior (Get Sheet Data).
// Iterate over all items received from the previous node.
for (const item of $input.all()) {
    const row = item.json;

    // 1. FILTRO DE ROBUSTEZ: Ignoramos las filas donde el campo Empleado está vacío.
    // ROBUSTNESS FILTER: We skip rows where the Employee field is empty.
    if (!row.Empleado || row.Empleado.trim() === '') {
        continue; // Pasamos a la siguiente iteración del bucle (Skip to the next iteration).
    }
    
    // 2. LIMPIEZA DE DATOS: Aseguramos que los valores sean numéricos (usando 0 si son nulos).
    // DATA CLEANUP: Ensure values are numerical (using 0 if null).
    const horas = parseFloat(row.Horas || 0);
    const tarifa = parseFloat(row.Tarifa_Hora || 0);
    
    let pagoTotal = 0;
    
    // 3. LÓGICA DE NEGOCIO: Calculamos el pago solo si las variables son números válidos.
    // BUSINESS LOGIC: Calculate payment only if variables are valid numbers.
    if (!isNaN(horas) && !isNaN(tarifa)) {
        pagoTotal = horas * tarifa;
    }
    
    // 4. CONSTRUCCIÓN DEL OBJETO DE SALIDA:
    // OUTPUT OBJECT CONSTRUCTION:
    const finalItem = {
        ...row, // Copiamos todos los campos originales (incluyendo row_number y Estado). (Copy all original fields).
        Pago_Total: pagoTotal // Añadimos el nuevo campo calculado. (Add the new calculated field).
    };
    
    // 5. [Opcional si no usas la inyección del total]: Limpiamos el campo Estado para el reporte final.
    // delete finalItem.Estado; 
    
    // Añadimos el ítem procesado a la lista de salida.
    // Add the processed item to the output list.
    processedData.push({ json: finalItem });
}

// Devolvemos todos los ítems que pasaron la validación y transformación.
// Return all items that passed validation and transformation.
return processedData;

// --- Fin del Código ---