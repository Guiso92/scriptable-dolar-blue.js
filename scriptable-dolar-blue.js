/* --------------------------------------------------------------
Script: scriptable-dolar-blue.js
Author: Diego Graziano
Version: 1.0.1

Description:
Displays the current "Dolar Blue" currency rate to Argentine Peso (ARS).

Changelog:

1.0.0: Initialization
1.0.1: When touching the widget it opens URL "dolarito.ar" with all dollar types of currency rates.
-------------------------------------------------------------- */
const url = `https://api-dolar-argentina.herokuapp.com/api/dolarblue`
const req = new Request(url)
const res = await req.loadJSON()
const valor = res.venta;
const fecha = res.fecha;
const i = new Request('https://github.com/diegograziano/scriptable-dolar-blue.js/raw/main/img/dollar-icon.png')
const img = await i.loadImage()
const timeFormatter = new DateFormatter();
timeFormatter.dateFormat = 'dd/MM/yyyy HH:mm';


let widget = createWidget(valor, fecha, img)
if (config.runsInWidget) {
  // create and show widget
  Script.setWidget(widget)
  Script.complete()
} else {
  widget.presentSmall()
}

// Assemble widget layout
function createWidget(valor, fecha, img) {
  let w = new ListWidget()
  w.backgroundColor = new Color("#1A1A1A")
  w.url = 'https://dolarito.ar';

  let image = w.addImage(img)
  image.imageSize = new Size(45, 45)
  image.centerAlignImage()

  w.addSpacer(8)

  let staticText = w.addText("Valor Dolar Blue:")
  staticText.textColor = Color.white()
  staticText.font = Font.boldSystemFont(12)
  staticText.centerAlignText()

  w.addSpacer(8)

  let valorTxt = w.addText(valor)
  valorTxt.textColor = Color.blue()
  valorTxt.font = Font.systemFont(18)
  valorTxt.centerAlignText()

  w.addSpacer(8)

  // Show last Update of dolar blue
  let lastDate = w.addText(timeFormatter.string(new Date()));
  lastDate.textColor = Color.gray()
  lastDate.font = Font.mediumSystemFont(10)
  lastDate.centerAlignText();

  w.setPadding(0, 0, 0, 0)
  return w

}
