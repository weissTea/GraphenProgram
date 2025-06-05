# GraphenProgram
Graphenprogramm im Rahmen des Unterrichts.

Hier Lade ich mein Graphenprogram hoch, welches eine Adjazenzmatrix einlesen und daraus Distazmatrix, Exzentritäten und Radius berechnen kann.

Umsetzung:
Ich habe das Program in VS-Code, mit Live-Server umgesetzt.
Dabei habe ich eine html.index, styles.css und eine JavaScript datei erstellt.


Die HTML Datei ist sehr klein gehalten.
Es wurde nur die Mindestanforderung erfüllt: 

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Graphanalyse</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Graphenprogramm mit Adjazenzmatrix</h1>
    <p>Lade eine CSV-Datei hoch:</p>
    <input type="file" id="fileInput" accept=".csv">
    <div id="output"></div>

    <script src="script.js"></script>
</body>
</html>


Hier wurde nur das Umfeld designed:

body {
    font-family: Arial, sans-serif;
    margin: 40px;
    background-color: #f5f5f5;
    color: #333;
}

h1 {
    color: #000000;
}

#output {
    margin-top: 20px;
    white-space: pre-wrap;
    background: #fff;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
