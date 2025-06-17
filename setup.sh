#!/bin/bash

# Verifica se è stato passato un parametro
if [ -z "$1" ]; then
    echo "⚠️  Uso: ./setup.sh NomeApplicazione"
    exit 1
fi

# Nome della tua applicazione preso da argomento
APP_NAME="$1"

# URL base del repository GitHub (RAW)
BASE_URL="https://raw.githubusercontent.com/caronealessio/setup-project-ui5/main"

# Elenco dei file da scaricare con path completo
FILES=(
    "webapp/controller/BaseController.js"
    "webapp/controller/App.controller.js"
    "webapp/controller/Home.controller.js"
    "webapp/model/formatter.js"
    "webapp/utils/generalUtils.js"
    "webapp/utils/entityUtils.js"
    ".vscode/extensions.json"
    ".vscode/settings.json"
    "package.json"
)

# Scarica ciascun file e sostituisci tutte le occorrenze di 'appnamespace'
for FILE in "${FILES[@]}"; do
    DEST_PATH="$FILE"  # Percorso di destinazione corrispondente al path remoto

    # Crea le cartelle se non esistono
    mkdir -p "$(dirname "$DEST_PATH")"

    # Scarica il file
    curl -s -o "$DEST_PATH" "$BASE_URL/$FILE"

    if [ $? -eq 0 ]; then
        echo "✅ Scaricato: $FILE"

        # Sostituisci tutte le occorrenze di 'appnamespace' con il nome app
        sed -i "s/appnamespace/$APP_NAME/g" "$DEST_PATH"
        echo "🔧 Occorrenze 'appnamespace' sostituite con '$APP_NAME' in $DEST_PATH"
    else
        echo "❌ Errore nel download di: $FILE"
    fi
done

echo "✅ Setup completato!"