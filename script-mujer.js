// ===================================
// BAELIO 2026 - Women's Perfumes Only
// ===================================

const allProducts = [
    // PERFUMES DE MUJER (F01-F66)
    { code: 'F01', name: 'PALOMA PICASSO', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Rosa, ylang-ylang, jazmín, ámbar. Ideal para: Noche y ocasiones especiales todo el año' },
    { code: 'F02', name: 'POISON', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Ciruela, miel, bayas, ámbar, almizcle. Ideal para: Otoño-Invierno, eventos nocturnos' },
    { code: 'F03', name: 'OSCAR DE LA RENTA', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Gardenia, jazmín, rosa, ámbar. Ideal para: Primavera-Verano, día y noche' },
    { code: 'F04', name: 'ANGEL', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Vainilla, caramelo, chocolate, pachulí. Ideal para: Otoño-Invierno, noche' },
    { code: 'F05', name: 'CHANEL Nº 5', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Aldehídos, neroli, jazmín, rosa, vainilla. Ideal para: Todo el año, ocasiones elegantes' },
    { code: 'F06', name: '212 VIP ROSÉ', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Champagne rosado, durazno, rosa. Ideal para: Primavera-Verano, fiestas diurnas' },
    { code: 'F07', name: 'RALPH', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Manzana, magnolia, mandarina. Ideal para: Primavera-Verano, uso diario' },
    { code: 'F08', name: 'PARADOX', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Lavanda, musgo, ámbar. Ideal para: Todo el año, día y noche' },
    { code: 'F09', name: 'TRESOR', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Rosa, lila, albaricoque, melocotón, vainilla. Ideal para: Otoño-Invierno, ocasiones románticas' },
    { code: 'F10', name: 'COCO MADEMOISELLE', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Naranja, jazmín, rosa, pachulí, vainilla. Ideal para: Todo el año, elegante y versátil' },
    { code: 'F11', name: 'COCO CHANEL', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Coriandro, rosa búlgara, jazmín, ámbar. Ideal para: Otoño-Invierno, noche elegante' },
    { code: 'F12', name: 'BLACK OPIUM', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Café, vainilla, flor de azahar, jazmín. Ideal para: Otoño-Invierno, noche y fiestas' },
    { code: 'F13', name: '212 HEROES FOR HER', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Pera, coco, vainilla. Ideal para: Primavera-Verano, uso diario juvenil' },
    { code: 'F14', name: 'CH', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Jazmín, rosa, sándalo, ámbar. Ideal para: Todo el año, elegante y femenino' },
    { code: 'F15', name: 'LOLITA LEMPICKA', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Anís, violeta, regaliz, vainilla. Ideal para: Otoño-Invierno, ocasiones especiales' },
    { code: 'F16', name: 'ANAIS-ANAIS', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Jacinto, rosa, lirio, jazmín. Ideal para: Primavera-Verano, romántico y delicado' },
    { code: 'F17', name: 'O DE LANCOME', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Mandarina, bergamota, madreselva, jazmín. Ideal para: Primavera-Verano, fresco y luminoso' },
    { code: 'F18', name: 'CAROLINA HERRERA', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Jazmín, tuberosa, ylang-ylang. Ideal para: Todo el año, elegante y sofisticado' },
    { code: 'F19', name: 'LA BOMBA', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Frutas tropicales, flores blancas, vainilla. Ideal para: Verano, festivo y sensual' },
    { code: 'F20', name: 'ETERNITY', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Fresia, salvia, lirio, rosa. Ideal para: Primavera-Verano, romántico atemporal' },
    { code: 'F21', name: 'ORGANZA', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Gardenia, nuez moscada, vainilla, ámbar. Ideal para: Otoño-Invierno, oriental y exótico' },
    { code: 'F22', name: 'WOMAN', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Bergamota, jazmín, cedro, almizcle. Ideal para: Todo el año, versátil y moderno' },
    { code: 'F23', name: 'MY WAY', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Bergamota, flor de azahar, tuberosa, vainilla. Ideal para: Primavera-Verano, fresco floral' },
    { code: 'F24', name: 'BLOOM', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Jazmín sambac, tuberosa, rangoon. Ideal para: Primavera-Verano, jardín floral' },
    { code: 'F25', name: 'BURBERRY HER', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Frambuesa, mora, violeta, almizcle. Ideal para: Primavera-Verano, frutal y juvenil' },
    { code: 'F26', name: 'PARIS', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Rosa, violeta, mimosa, iris. Ideal para: Primavera, romántico parisino' },
    { code: 'F27', name: 'BE DELICIOUS', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Manzana verde, pepino, magnolia, ámbar. Ideal para: Primavera-Verano, fresco y frutal' },
    { code: 'F28', name: 'CK ONE', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Limón, bergamota, papaya, lirio, almizcle. Ideal para: Primavera-Verano, unisex fresco' },
    { code: 'F29', name: '212 CAROLINA HERRERA', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Cactus, bergamota, gardenia, sándalo. Ideal para: Primavera-Verano, urbano moderno' },
    { code: 'F30', name: 'DEVOTION', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Limón, flor de azahar, vainilla. Ideal para: Otoño-Invierno, gourmand sensual' },
    { code: 'F31', name: 'EDEN', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Melón, mandarina, loto, cedro. Ideal para: Verano, acuático exótico' },
    { code: 'F32', name: 'ESCAPE', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Manzana, melocotón, rosa, jazmín. Ideal para: Primavera-Verano, liberador y fresco' },
    { code: 'F33', name: 'LA VIDA ES BELLA INTENSE', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Iris, praliné, vainilla, pachulí. Ideal para: Otoño-Invierno, dulce intenso' },
    { code: 'F34', name: 'LADY MILLION EMPIRE', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Naranja, neroli, gardenia, pachulí. Ideal para: Todo el año, lujoso y brillante' },
    { code: 'F35', name: 'FLOWER BY KENZO', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Amapola, rosa búlgara, vainilla. Ideal para: Primavera, floral delicado' },
    { code: 'F36', name: 'TOMMY GIRL', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Manzana, grosella negra, camelia, cedro. Ideal para: Primavera-Verano, juvenil fresco' },
    { code: 'F37', name: 'XS BLACK WOMAN', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Tamarindo, rosa, cacao, pachulí. Ideal para: Otoño-Invierno, sensual misterioso' },
    { code: 'F38', name: "J'ADORE", category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Ylang-ylang, rosa damascena, jazmín. Ideal para: Todo el año, bouquet floral lujoso' },
    { code: 'F39', name: 'BOSS WOMAN', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Mandarina, fresia, lirio, ámbar. Ideal para: Todo el año, elegante profesional' },
    { code: 'F40', name: 'AMOR AMOR', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Naranja sanguina, jazmín, vainilla. Ideal para: Primavera-Verano, romántico frutal' },
    { code: 'F41', name: 'CAN CAN', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Clementina, nectarina, jazmín, almizcle. Ideal para: Primavera-Verano, seductor femenino' },
    { code: 'F42', name: 'SCANDAL', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Miel, gardenia, pachulí. Ideal para: Otoño-Invierno, provocativo dulce' },
    { code: 'F43', name: 'GOOD GIRL', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Almendra, café, tuberosa, cacao. Ideal para: Otoño-Invierno, dual seductor' },
    { code: 'F44', name: 'OLYMPEA', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Mandarina verde, jengibre, vainilla salada. Ideal para: Primavera-Verano, fresco sensual' },
    { code: 'F45', name: 'HALLOWEEN', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Violeta, pimienta, incienso, vainilla. Ideal para: Otoño-Invierno, misterioso especiado' },
    { code: 'F46', name: '212 SEXY', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Mandarina, gardenia, vainilla, almizcle. Ideal para: Noche todo el año, sensual moderno' },
    { code: 'F47', name: 'LA VIDA ES BELLA ROSÉ', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Grosella negra, pera, iris, vainilla. Ideal para: Primavera-Verano, frutal rosado' },
    { code: 'F48', name: 'DUENDE', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Bergamota, jazmín, vainilla, sándalo. Ideal para: Todo el año, mágico encantador' },
    { code: 'F49', name: 'NINA', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Limón, manzana caramelizada, vainilla. Ideal para: Otoño-Invierno, dulce juvenil' },
    { code: 'F50', name: 'LIGHT BLUE', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Limón siciliano, manzana, jazmín, cedro. Ideal para: Primavera-Verano, mediterráneo fresco' },
    { code: 'F51', name: 'SI', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Grosella negra, rosa de mayo, vainilla. Ideal para: Todo el año, elegante afirmativo' },
    { code: 'F52', name: 'ULTRAVIOLET', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Albaricoque, ámbar, vainilla, violeta. Ideal para: Otoño-Invierno, moderno vibrante' },
    { code: 'F53', name: 'EUPHORIA', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Granada, orquídea negra, ámbar, caoba. Ideal para: Otoño-Invierno, sensual oriental' },
    { code: 'F54', name: 'LADY MILLION', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Neroli, frambuesa, jazmín, miel. Ideal para: Todo el año, lujoso brillante' },
    { code: 'F55', name: '212 VIP', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Ron, vainilla, almizcle, gardenia. Ideal para: Otoño-Invierno, exclusivo nocturno' },
    { code: 'F56', name: 'MISS DIOR ROSE', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Rosa de Grasse, geranio, almizcle blanco. Ideal para: Primavera, elegancia floral' },
    { code: 'F57', name: 'LA VIDA ES BELLA', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Iris, praliné, vainilla, pachulí. Ideal para: Todo el año, gourmand feliz' },
    { code: 'F58', name: 'LIBRE', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Lavanda, flor de azahar, vainilla, almizcle. Ideal para: Todo el año, libertad moderna' },
    { code: 'F59', name: 'IDOLE', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Pera, rosa, jazmín, vainilla. Ideal para: Primavera-Verano, limpio moderno' },
    { code: 'F60', name: 'ACQUA DI GIOIA', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Menta, limón, jazmín, cedro. Ideal para: Primavera-Verano, acuático fresco' },
    { code: 'F61', name: "LA VIDA ES BELLA L'ELIXIR", category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Iris, vainilla, fava tonka, pachulí. Ideal para: Otoño-Invierno, concentrado intenso' },
    { code: 'F62', name: 'DOLCE', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Neroli, flor de naranjo, papaya, almizcle. Ideal para: Primavera-Verano, dulce femenino' },
    { code: 'F63', name: 'LIVE IRRESISTIBLE', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Pimienta rosa, rosa, pachulí. Ideal para: Todo el año, irresistible chispeante' },
    { code: 'F64', name: 'LA NUIT TRESOR', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Vainilla, rosa, incienso, pachulí. Ideal para: Otoño-Invierno, nocturno sensual' },
    { code: 'F65', name: 'FAME', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Mango, jazmín, incienso, vainilla. Ideal para: Todo el año, sensual adictivo' },
    { code: 'F66', name: 'VERY GOOD GIRL', category: 'mujer', sizes: '100ml | 50ml | 20ml', description: 'Notas: Rosa, frambuesa, vainilla, fava tonka. Ideal para: Otoño-Invierno, intenso seductor' },

    // PERFUMES DE HOMBRE (H01-H45)
    { code: 'H01', name: 'DRAKKAR NOIR', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Lavanda, limón, vetiver, cedro. Ideal para: Todo el año, clásico masculino' },
    { code: 'H02', name: 'AZZARO', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Lavanda, anís, sándalo, ámbar. Ideal para: Todo el año, aromático atemporal' },
    { code: 'H03', name: 'QUORUM', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Limón, pino, tabaco, cuero. Ideal para: Otoño-Invierno, distinguido clásico' },
    { code: 'H04', name: 'PACO RABANNE', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Lavanda, romero, geranio, roble. Ideal para: Todo el año, aromático fougère' },
    { code: 'H05', name: 'INVICTUS PLATINUM', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Pomelo, lavanda, ciprés, ámbar gris. Ideal para: Otoño-Invierno, deportivo intenso' },
    { code: 'H06', name: 'POLO BLUE MEN', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Melón, pepino, albahaca, almizcle. Ideal para: Primavera-Verano, acuático fresco' },
    { code: 'H07', name: '212 HEROES MEN', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Cannabis, jengibre, geranio, cuero. Ideal para: Todo el año, audaz moderno' },
    { code: 'H08', name: 'ARMANI CODE SPORT', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Menta, limón, jengibre, vetiver. Ideal para: Primavera-Verano, deportivo elegante' },
    { code: 'H09', name: 'TOMMY', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Menta, lavanda, pomelo, algodón. Ideal para: Primavera-Verano, juvenil fresco' },
    { code: 'H10', name: 'CAROLINA HERRERA', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Bergamota, lavanda, geranio, pachulí. Ideal para: Todo el año, elegante aromático' },
    { code: 'H11', name: 'AGUA BRAVA', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Lavanda, salvia, pino, musgo de roble. Ideal para: Todo el año, clásico español' },
    { code: 'H12', name: 'TED LAPIDUS', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Bergamota, lavanda, vainilla, almizcle. Ideal para: Todo el año, sofisticado' },
    { code: 'H13', name: 'POLO SPORT', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Mandarina, aldehídos, musgo de roble. Ideal para: Primavera-Verano, deportivo energético' },
    { code: 'H14', name: '212 FOR MEN', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Bergamota, especias, sándalo, almizcle. Ideal para: Todo el año, urbano moderno' },
    { code: 'H15', name: 'SAUVAGE ELIXIR', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Canela, nuez moscada, lavanda, sándalo. Ideal para: Otoño-Invierno, concentrado salvaje' },
    { code: 'H16', name: 'STRONGER WITH YOU', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Menta, canela, vainilla, castaña. Ideal para: Otoño-Invierno, dulce especiado' },
    { code: 'H17', name: 'BURBERRY HERO', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Cedro de tres montañas, bergamota. Ideal para: Todo el año, amaderado moderno' },
    { code: 'H18', name: 'SAUVAGE', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Bergamota, pimienta, lavanda, ámbar gris. Ideal para: Todo el año, salvaje fresco' },
    { code: 'H19', name: 'FAHRENHEIT', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Violeta, cuero, nuez moscada, cedro. Ideal para: Otoño-Invierno, único distintivo' },
    { code: 'H20', name: 'ACQUA DI GIO PROFONDO', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Bergamota, romero marino, almizcle, ámbar. Ideal para: Primavera-Verano, marino profundo' },
    { code: 'H21', name: 'ELEMENTS', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Bergamota, lavanda, cedro, vetiver. Ideal para: Todo el año, aromático natural' },
    { code: 'H22', name: 'ACQUA DI GIO', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Limón, bergamota, jazmín, cedro. Ideal para: Primavera-Verano, acuático icónico' },
    { code: 'H23', name: 'HALLOWEEN MAN', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Limón, lavanda, incienso, vainilla. Ideal para: Otoño-Invierno, misterioso especiado' },
    { code: 'H24', name: 'BOSS', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Manzana, geranio, vainilla, sándalo. Ideal para: Todo el año, elegante profesional' },
    { code: 'H25', name: '212 VIP MEN', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Vodka helado, jengibre, caviar, ámbar. Ideal para: Otoño-Invierno, exclusivo nocturno' },
    { code: 'H26', name: 'CK ONE', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Limón, bergamota, papaya, lirio, almizcle. Ideal para: Primavera-Verano, unisex fresco' },
    { code: 'H27', name: 'XS BLACK MEN', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Limón, salvia, canela, praliné. Ideal para: Otoño-Invierno, sensual afrodisíaco' },
    { code: 'H28', name: 'EROS', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Menta, manzana verde, vainilla, cedro. Ideal para: Todo el año, poderoso seductor' },
    { code: 'H29', name: 'ONE MILLION INTENSE', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Manzana roja, canela, cuero, ámbar. Ideal para: Otoño-Invierno, lujoso intenso' },
    { code: 'H30', name: 'LIGHT BLUE MEN', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Pomelo, enebro, romero, almizcle. Ideal para: Primavera-Verano, mediterráneo fresco' },
    { code: 'H31', name: 'POLO BLACK', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Mango, sándalo, salvia, pachulí. Ideal para: Otoño-Invierno, sofisticado seductor' },
    { code: 'H32', name: 'Y EDT', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Manzana, jengibre, salvia, cedro. Ideal para: Primavera-Verano, moderno fresco' },
    { code: 'H33', name: 'LE BEU', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Bergamota, lavanda, vetiver, almizcle. Ideal para: Todo el año, elegante masculino' },
    { code: 'H34', name: 'ONE MILLION', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Pomelo, menta, canela, cuero, ámbar. Ideal para: Todo el año, lujoso brillante' },
    { code: 'H35', name: 'MYSLF', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Bergamota, flor de azahar, ámbar, pachulí. Ideal para: Todo el año, moderno auténtico' },
    { code: 'H36', name: 'INVICTUS', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Pomelo, hoja de laurel, guayaco, ámbar gris. Ideal para: Primavera-Verano, deportivo fresco' },
    { code: 'H37', name: 'ACQUA DI GIO ABSOLU', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Bergamota, romero marino, lavanda, pachulí. Ideal para: Todo el año, marino amaderado' },
    { code: 'H38', name: 'POLO RED', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Pomelo rojo, salvia, café, ámbar. Ideal para: Otoño-Invierno, intenso especiado' },
    { code: 'H39', name: 'GUCCI GUILTY', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Limón, lavanda, pachulí. Ideal para: Todo el año, provocativo aromático' },
    { code: 'H40', name: '212 VIP BLACK', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Anís, lavanda, vainilla, almizcle. Ideal para: Otoño-Invierno, oscuro misterioso' },
    { code: 'H41', name: 'BLEU CHANEL', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Limón, menta, cedro, sándalo. Ideal para: Todo el año, aromático amaderado elegante' },
    { code: 'H42', name: 'STRONGER WITH YOU INTENSELY', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Caramelo salado, canela, vainilla, fava tonka. Ideal para: Otoño-Invierno, dulce intenso' },
    { code: 'H43', name: 'BAD BOY', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Pimienta, bergamota, salvia, cacao, ámbar. Ideal para: Todo el año, rebelde dual' },
    { code: 'H44', name: 'PHANTOM', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Limón, lavanda, vainilla, pachulí. Ideal para: Todo el año, futurista energético' },
    { code: 'H45', name: '212 VIP BLACK ELIXIR', category: 'hombre', sizes: '100ml | 50ml | 20ml', description: 'Notas: Anís, ron, vainilla, fava tonka. Ideal para: Otoño-Invierno, elixir concentrado' },

    // BLACK PARFUMS - LÍNEA PREMIUM (Q51-Q59)
    { code: 'Q51', name: 'Santal 33', category: 'black-premium', sizes: '100ml', description: 'Notas: Sándalo australiano, cedro, cardamomo, iris, violeta. Ideal para: Todo el año, unisex culto' },
    { code: 'Q52', name: 'Ombré Leather', category: 'black-premium', sizes: '100ml', description: 'Notas: Cuero negro, jazmín sambac, pachulí, ámbar. Ideal para: Otoño-Invierno, cuero intenso' },
    { code: 'Q53', name: 'Silver Mountain Water', category: 'black-premium', sizes: '100ml', description: 'Notas: Bergamota, té verde, grosella negra, almizcle. Ideal para: Primavera-Verano, alpino fresco' },
    { code: 'Q54', name: 'Aventus', category: 'black-premium', sizes: '100ml', description: 'Notas: Piña, bergamota, manzana, pachulí, vainilla. Ideal para: Todo el año, icónico poderoso' },
    { code: 'Q55', name: 'Neroli Portofino', category: 'black-premium', sizes: '100ml', description: 'Notas: Neroli, bergamota, limón, ámbar, almizcle. Ideal para: Primavera-Verano, mediterráneo elegante' },
    { code: 'Q56', name: 'Born in Roma Uomo', category: 'black-premium', sizes: '100ml', description: 'Notas: Violeta, jengibre, vetiver, sal mineral. Ideal para: Todo el año, sofisticación romana' },
    { code: 'Q57', name: 'Erba Pura', category: 'black-premium', sizes: '100ml', description: 'Notas: Naranja, limón, frutas, vainilla, almizcle. Ideal para: Primavera-Verano, dulzura mediterránea' },
    { code: 'Q58', name: "L'immensité", category: 'black-premium', sizes: '100ml', description: 'Notas: Lavanda, salvia, pomelo, ámbar gris. Ideal para: Todo el año, inmensidad aromática' },
    { code: 'Q59', name: 'Marly Althair', category: 'black-premium', sizes: '100ml', description: 'Notas: Vainilla bourbon, cardamomo, canela, ámbar. Ideal para: Otoño-Invierno, oriental elegante' },

    // RED PARFUMS - LÍNEA PREMIUM (Q01-Q09)
    { code: 'Q01', name: 'English Pear and Freesia', category: 'red-premium', sizes: '100ml', description: 'Notas: Pera, fresia, rosa, pachulí, ámbar. Ideal para: Primavera-Verano, frutal elegante' },
    { code: 'Q02', name: 'Black Orchid', category: 'red-premium', sizes: '100ml', description: 'Notas: Orquídea negra, trufa, ylang-ylang, pachulí. Ideal para: Otoño-Invierno, lujo oscuro' },
    { code: 'Q03', name: "Love Don't Be Shy", category: 'red-premium', sizes: '100ml', description: 'Notas: Marshmallow, naranja, jazmín, almizcle. Ideal para: Todo el año, dulzura adictiva' },
    { code: 'Q04', name: 'Soleil Blanc', category: 'red-premium', sizes: '100ml', description: 'Notas: Bergamota, pimienta rosa, coco, ámbar. Ideal para: Verano, sol blanco tropical' },
    { code: 'Q05', name: 'Baccarat Rouge', category: 'red-premium', sizes: '100ml', description: 'Notas: Azafrán, jazmín, ámbar gris, cedro. Ideal para: Todo el año, lujo absoluto' },
    { code: 'Q06', name: 'Bianco Latte', category: 'red-premium', sizes: '100ml', description: 'Notas: Leche, vainilla, almizcle blanco, sándalo. Ideal para: Otoño-Invierno, cremosidad láctea' },
    { code: 'Q07', name: 'Oriana', category: 'red-premium', sizes: '100ml', description: 'Notas: Bergamota, frutas, vainilla, almizcle. Ideal para: Primavera-Verano, dulzura floral' },
    { code: 'Q08', name: 'Attrape-Rêves', category: 'red-premium', sizes: '100ml', description: 'Notas: Pera, rosa, pachulí, vainilla. Ideal para: Todo el año, atrapasueños elegante' },
    { code: 'Q09', name: 'Bleecker Street', category: 'red-premium', sizes: '100ml', description: 'Notas: Violeta, cachemira, cedro, vainilla. Ideal para: Otoño-Invierno, elegancia urbana' },

    // JUVENILES TEEN (J00-J09)
    { code: 'J00', name: 'Cloud', category: 'teen', sizes: '50ml', description: 'Notas: Lavanda, pera, coco, praliné, vainilla. Ideal para: Todo el año, dulce celestial juvenil' },
    { code: 'J01', name: 'Fantasy', category: 'teen', sizes: '50ml', description: 'Notas: Kiwi, lichi, cupcake, chocolate blanco. Ideal para: Primavera-Verano, fantasía frutal' },
    { code: 'J02', name: 'Selena', category: 'teen', sizes: '50ml', description: 'Notas: Frutas, flores, vainilla, almizcle. Ideal para: Todo el año, juvenil vibrante' },
    { code: 'J03', name: 'Bombshell', category: 'teen', sizes: '50ml', description: 'Notas: Fresa, peonía, vainilla, almizcle. Ideal para: Primavera-Verano, explosión frutal' },
    { code: 'J04', name: 'Thank You Next', category: 'teen', sizes: '50ml', description: 'Notas: Pera, frambuesa, coco, rosa. Ideal para: Primavera-Verano, dulzura moderna' },
    { code: 'J05', name: 'Meow', category: 'teen', sizes: '50ml', description: 'Notas: Frutas dulces, flores, vainilla. Ideal para: Todo el año, juguetón dulce' },
    { code: 'J06', name: 'Sweet Like Candy', category: 'teen', sizes: '50ml', description: 'Notas: Grosella negra, marshmallow, vainilla. Ideal para: Otoño-Invierno, dulce como caramelo' },
    { code: 'J07', name: 'Legacy', category: 'teen', sizes: '50ml', description: 'Notas: Frutas, flores, almizcle. Ideal para: Todo el año, legado juvenil' },
    { code: 'J08', name: 'Spirit of the Brave', category: 'teen', sizes: '50ml', description: 'Notas: Manzana, lavanda, cedro. Ideal para: Todo el año, espíritu valiente' },
    { code: 'J09', name: 'Invictus Aqua', category: 'teen', sizes: '50ml', description: 'Notas: Pomelo, hoja de laurel, ámbar gris. Ideal para: Primavera-Verano, acuático juvenil' },

    // LAVIT PARFUMS & EDICIÓN CARNAVAL
    { code: 'L01', name: 'Fresh Garden', category: 'lavit', sizes: '210ml | 50ml', description: 'Notas: Notas verdes, flores blancas, almizcle. Ideal para: Primavera-Verano, jardín fresco' },
    { code: 'L02', name: 'Fruits of Summer', category: 'lavit', sizes: '210ml | 50ml', description: 'Notas: Frutas tropicales, cítricos, vainilla. Ideal para: Verano, frutas jugosas' },
    { code: 'L03', name: 'Rock in Rio', category: 'lavit', sizes: '210ml | 50ml', description: 'Notas: Frutas tropicales, flores, almizcle. Ideal para: Verano, energía carnaval' },
    { code: 'L04', name: 'Tropical Caribbean', category: 'lavit', sizes: '210ml | 50ml', description: 'Notas: Coco, piña, vainilla, almizcle. Ideal para: Verano, paraíso caribeño' },
    { code: 'L05', name: 'Coconut Passion', category: 'lavit', sizes: '210ml | 50ml', description: 'Notas: Coco, vainilla, almizcle blanco. Ideal para: Verano, pasión de coco' },
    { code: 'L06', name: 'Fantasy of Love', category: 'lavit', sizes: '210ml | 50ml', description: 'Notas: Frutas rojas, flores, vainilla. Ideal para: Primavera-Verano, fantasía romántica' },
    { code: 'L07', name: 'Pink Chiffon', category: 'lavit', sizes: '210ml | 50ml', description: 'Notas: Vainilla, almizcle, flores rosadas. Ideal para: Todo el año, suavidad rosada' },
    { code: 'L08', name: 'Forever Young', category: 'lavit', sizes: '210ml | 50ml', description: 'Notas: Cítricos, flores, almizcle fresco. Ideal para: Primavera-Verano, juventud eterna' },
    { code: 'L09', name: 'Black Raspberry', category: 'lavit', sizes: '210ml | 50ml', description: 'Notas: Frambuesa negra, vainilla, almizcle. Ideal para: Otoño-Invierno, frutal dulce' },
    { code: 'L10', name: 'Sweet Romance', category: 'lavit', sizes: '210ml | 50ml', description: 'Notas: Flores dulces, vainilla, almizcle. Ideal para: Todo el año, romance dulce' },
    { code: 'L11', name: 'Sheer Love', category: 'lavit', sizes: '210ml | 50ml', description: 'Notas: Flores delicadas, almizcle blanco. Ideal para: Primavera-Verano, amor puro' },
    { code: 'L12', name: 'Lavit 76', category: 'lavit', sizes: '100ml', description: 'Notas: Cítricos, flores, almizcle. Ideal para: Todo el año, fragancia exclusiva' },
    { code: 'L13', name: 'Lavit 59', category: 'lavit', sizes: '100ml', description: 'Notas: Frutas, flores, vainilla. Ideal para: Primavera-Verano, aroma característico' },
    { code: 'L14', name: 'Lavit 71', category: 'lavit', sizes: '100ml', description: 'Notas: Especias, madera, almizcle. Ideal para: Otoño-Invierno, esencia única' },
    { code: 'L15', name: 'Lavit 62', category: 'lavit', sizes: '100ml', description: 'Notas: Flores, frutas, almizcle. Ideal para: Todo el año, perfume especial' },
    { code: 'L16', name: 'Lavit 68', category: 'lavit', sizes: '100ml', description: 'Notas: Cítricos, madera, almizcle. Ideal para: Todo el año, fragancia distintiva' }
];

// Filter only women's perfumes
const products = allProducts.filter(p => p.category === 'mujer');

// ===================================
// Helper function to get image by category
// ===================================
function getProductImage(category) {
    const imageMap = {
        'mujer': 'images/women.png',
        'hombre': 'images/men.png',
        'black-premium': 'images/premium.png',
        'red-premium': 'images/premium.png',
        'teen': 'images/women.png',
        'lavit': 'images/men.png'
    };
    return imageMap[category] || 'images/women.png';
}

// ===================================
// State Management
// ===================================
let currentFilter = 'all';
let searchQuery = '';

// ===================================
// DOM Elements
// ===================================
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const noResults = document.getElementById('noResults');

// ===================================
// Render Products
// ===================================
function renderProducts() {
    const filteredProducts = products.filter(product => {
        const matchesFilter = currentFilter === 'all' || product.category === currentFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.code.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        productsGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    productsGrid.style.display = 'grid';
    noResults.style.display = 'none';

    productsGrid.innerHTML = filteredProducts.map((product, index) => `
        <div class="product-card" style="animation-delay: ${index * 0.05}s">
            <div class="product-image"></div>
            <div class="product-header">
                <span class="product-code">${product.code}</span>
                <span class="product-category category-${product.category}">${getCategoryName(product.category)}</span>
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-sizes"><strong>Tamaños:</strong> ${product.sizes}</p>
            <button class="product-btn" onclick="contactWhatsApp('${product.code}', '${product.name}')">
                Consultar por WhatsApp
            </button>
        </div>
    `).join('');
}

// ===================================
// Helper Functions
// ===================================
function getCategoryName(category) {
    const categoryNames = {
        'mujer': 'Mujer',
        'hombre': 'Hombre',
        'black-premium': 'Black Premium',
        'red-premium': 'Red Premium',
        'teen': 'Teen',
        'lavit': 'Lavit'
    };
    return categoryNames[category] || category;
}

function contactWhatsApp(code, name) {
    const message = encodeURIComponent(`Hola! Me interesa el perfume ${code} - ${name}. ¿Podrías darme más información?`);
    const phoneNumber = '1234567890'; // Reemplazar con tu número de WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// ===================================
// Event Listeners
// ===================================

// Filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.dataset.category;
        renderProducts();
    });
});

// Search input
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();

    // ===================================
    // Interactive Features (Mobile Menu & Scroll)
    // ===================================

    // 1. Mobile Menu Logic
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (menuBtn && nav) {
        // Toggle Menu
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.toggle('active');
            menuBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
        });

        // Close when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuBtn.innerHTML = '☰';
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
                nav.classList.remove('active');
                menuBtn.innerHTML = '☰';
            }
        });
    }

    // 2. Scroll Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    setTimeout(() => {
        const elements = document.querySelectorAll('.product-card, .footer-section, .hero-content');
        elements.forEach(el => {
            el.classList.add('fade-in-section');
            observer.observe(el);
        });
    }, 100);

    // 3. Parallax Effect
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.scrollY;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
});

