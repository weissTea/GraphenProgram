document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;
    //file reader um die CSV auswählen zu können

    const reader = new FileReader();
    reader.onload = function (e) {
        const content = e.target.result;
        const matrix = umwandelnCSV(content);  //erstellt die constante matrix, welche die funktion umwandelnCSV aufruft
        const ergebnis = analiserenGraphen(matrix); // hier das gleiche mit der constante result, aber in dieser wird die Matrix gespeichert
        document.getElementById('output').textContent = ergebnis;
    };
    reader.readAsText(file);
});

// CSV in Matrix umwandeln
function umwandelnCSV(text) {
    return text.trim().split('\n').map(row => row.split(';').map(Number));
    //trim: entfernt Zeilenumbrüche und leerzeichen
    //split: teilt den text in ein Array auf
    //map(row => : sagt das es auf das gesamte Array angewendet wird
    //row.split(';') : teilt jede Zeile bei einem  ; 
    //map(Number) : wandelt nun das array in Zahlen um
}

// Graphanalyse mit Dijkstra
function analiserenGraphen(adjMatrix) {
    const laengeMatrix = adjMatrix.length; //anzahl der Knoten
    const distanzMatrix = []; //speicherort der Distanzmatrix in einem 2D-Array

    // Für jeden Knoten einmal Dijkstra ausführen
    for (let Knoten = 0; Knoten < laengeMatrix; Knoten++) {
        distanzMatrix[Knoten] = dijkstra(adjMatrix, Knoten);
    }
    //... ist ein spread operator und wandelt das array in einzelen Werte um
    const exz = distanzMatrix.map(row => Math.max(...row.filter(d => d < Infinity))); //berechnet die Exzentritäten, max distanz von diesem Knoten zu allen anderen, die erreichbar sind
    const radius = Math.min(...exz); //kleinste exzentrität
    const durchmesser = Math.max(...exz); //größte exzentrität
    const zentrum = exz.map((exzentrität, Knoten) => exzentrität === radius? Knoten : null).filter(Knoten => Knoten !== null); //ist die exz = rad?, wenn ja true, wenn nein null, filter alle Null Werte

    let output = 'Distanzmatrix:\n';
    output += distanzMatrix.map(row => row.map(Knoten => Knoten === Infinity? '∞' : Knoten).join('\t')).join('\n');
    output += '\n\nExzentrizitäten:\n';
    output += exz.join(', ');
    output += `\n\nRadius: ${radius}`; //$ um es direkt in den String einzubetten
    output += `\nDurchmesser: ${durchmesser}`;
    output += `\nZentrum: Knoten ${zentrum.join(', ')}`;
    return output;
}

// Dijkstra-Algorithmus
function dijkstra(matrix, start) {
    const laengeMatrix = matrix.length;
    const distanz = Array(laengeMatrix).fill(Infinity); //speichert kürzeste Distanzen
    const visited = Array(laengeMatrix).fill(false); //Markiert besuchte Knoten
    distanz[start] = 0; //Distanz vom Startknoten ist immer 0

    for (let count = 0; count < laengeMatrix - 1; count++) {  //durchläuft alle Knoten
        const minimumDistanz = findMinDistance(distanz, visited); //ruft die funktion auf um den Knoten mit der kleinsten aktuellen distanz zu finden
        if (minimumDistanz === -1) break;

        visited[minimumDistanz] = true; //wird als min erkannt und nun als besucht markiert

        for (let besucht = 0; besucht < laengeMatrix; besucht++) {
            if (
                !visited[besucht] &&  //Knoten noch nicht besucht?
                matrix[minimumDistanz][besucht] > 0 && //Und existiert eine Kante? 
                distanz[minimumDistanz] + matrix[minimumDistanz][besucht] < distanz[besucht] //ist der neue Weg kürzer als der alte
            ) {
                distanz[besucht] = distanz[minimumDistanz] + matrix[minimumDistanz][besucht]; //aktualiesieren der distanz
            }
        }
    }

    return distanz;
}

// Für Dijkstra
// wird benötigt um den nächsten nicht besuchten Knoten zu finden (mit der kleinsten Distanz)
function findMinDistance(distanz, visited) {
    let min = Infinity; //setzt die anfängliche Distanz auf unendlich, damit der kleinste Knoten genommen wird
    let minIndex = -1; //nur nötig falls kein StartKnoten gefunden wird

    for (let i = 0; i < distanz.length; i++) {
        if (!visited[i] && distanz[i] < min) {
            min = distanz[i];
            minIndex = i;   //eine Schleife die den kleinsten noch nicht gefundenen Knoten  findet und den Index des Knotens speichert
        }                   //bedingung: wurde der Knoten besucht? und die entfernung zum Knoten ist niedriger als das aktuelle min?
    }

    return minIndex;
}
