
export function makeClickableTable(elem:HTMLTableElement, cells:[[string]], func:(v:string)=>void) {
  var width = 0;
  for (var row of cells) {
    if (row.length > width) {
      width = row.length;
    }
  }
  var currentSelection:HTMLTableCellElement;
  for (var row of cells) {
    var tr = elem.insertRow();
    for (var i = 0; i < width; i++) {
      let td = tr.insertCell();
      if (i < row.length) {
        let cell = row[i];
        td.appendChild(document.createTextNode(cell));
        td.addEventListener('click', () => {
          currentSelection.style.backgroundColor = null;
          currentSelection = td;
          td.style.backgroundColor = 'lightgreen';
          func(cell)
        });
        if (currentSelection == undefined) {
            currentSelection = td;
            td.style.backgroundColor = 'lightgreen';
        }
      }
    }
  }
}

export function makeFraction(numerator:number, denominator:number) :string {
  var f = '';
  for (var n of numerator.toString()) {
    switch(n) {
      case '-':
        f += '⁻';
        break;
      case '0':
        f += '⁰';
        break;
      case '1':
        f += '¹';
        break;
      case '2':
        f += '²';
        break;
      case '3':
        f += '³';
        break;
      case '4':
        f += '⁴';
        break;
      case '5':
        f += '⁵';
        break;
      case '6':
        f += '⁶';
        break;
      case '7':
        f += '⁷';
        break;
      case '8':
        f += '⁸';
        break;
      case '9':
        f += '⁹';
        break;
    }
  }
  f += '⁄';
  for (var n of denominator.toString()) {
    switch(n) {
      case '-':
        f += '₋';
        break;
      case '0':
        f += '₀';
        break;
      case '1':
        f += '₁';
        break;
      case '2':
        f += '₂';
        break;
      case '3':
        f += '₃';
        break;
      case '4':
        f += '₄';
        break;
      case '5':
        f += '₅';
        break;
      case '6':
        f += '₆';
        break;
      case '7':
        f += '₇';
        break;
      case '8':
        f += '₈';
        break;
      case '9':
        f += '₉';
        break;
    }
  }
  return f;
}