function setMaxLimit() {
  console.log("setMaxLimit iniciado");

  var select = document.getElementById("plan-select-max");
  var input = document.getElementById("max-limit");
  var uploadMaxLimit = document.getElementById("upload-max-limit");
  var downloadMaxLimit = document.getElementById("download-max-limit");
  var uploadBurstThreshold = document.getElementById("upload-burst-threshold");
  var downloadBurstThreshold = document.getElementById(
    "download-burst-threshold"
  );
  var uploadBurstLimit = document.getElementById("upload-burst-limit");
  var downloadBurstLimit = document.getElementById("download-burst-limit");
  var uploadBurstTime = document.getElementById("upload-burst-time");
  var downloadBurstTime = document.getElementById("download-burst-time");
  var resultadoTexto = document.getElementById("resultado-texto");
  var resultadoTextoKb = document.getElementById("resultado-texto-kb");

  var intervalBonusValue = 40;
  console.log("Valor de intervalo de bonus:", intervalBonusValue);

  if (!select.value) {
    console.log("Error: Selección no válida");
    return;
  }

  input.value = select.value;
  uploadMaxLimit.textContent = select.value;
  downloadMaxLimit.textContent = select.value;
  console.log("Valor de plan seleccionado:", select.value);

  var selectedValue = parseFloat(select.value);
  console.log("Valor numérico seleccionado:", selectedValue);

  if (!isNaN(selectedValue)) {
    var burstThresholdValue = selectedValue * 750;
    console.log("Burst Threshold calculado:", burstThresholdValue + "K");
    uploadBurstThreshold.textContent = burstThresholdValue + "K";
    downloadBurstThreshold.textContent = burstThresholdValue + "K";

    calcularBurstTime(
      intervalBonusValue,
      parseFloat(uploadBurstLimit.textContent),
      burstThresholdValue,
      uploadBurstTime
    );
    calcularBurstTime(
      intervalBonusValue,
      parseFloat(downloadBurstLimit.textContent),
      burstThresholdValue,
      downloadBurstTime
    );

    var maxLimitValue = input.value;
    var burstLimitValue = uploadBurstLimit.textContent;
    var uploadBurstTimeValue = uploadBurstTime.textContent;
    var downloadBurstTimeValue = downloadBurstTime.textContent;

    var resultadoFinal = `${maxLimitValue}/${maxLimitValue} ${burstLimitValue}/${burstLimitValue} ${burstThresholdValue}K/${burstThresholdValue}K ${uploadBurstTimeValue}/${downloadBurstTimeValue} 8 ${maxLimitValue}/${maxLimitValue}`;

    var burstLimitNumeric = parseFloat(burstLimitValue) * 1000;
    var resultadoFinalKb = `${burstLimitNumeric * 1.048}K/${
      burstLimitNumeric * 1.048
    }K ${burstLimitNumeric * 1.048}K/${
      burstLimitNumeric * 1.048
    }K ${burstThresholdValue}K/${burstThresholdValue}K ${uploadBurstTimeValue}/${downloadBurstTimeValue} 8 ${
      burstLimitNumeric * 1.048
    }K/${burstLimitNumeric * 1.048}K`;

    resultadoTexto.value = resultadoFinal;
    resultadoTextoKb.value = resultadoFinalKb;
  } else {
    console.log("Error: Valor no válido para selección");
    uploadBurstThreshold.textContent = "";
    downloadBurstThreshold.textContent = "";
  }
}

function setburstLimit() {
  console.log("setburstLimit iniciado");

  var select = document.getElementById("plan-select-burst");
  var input = document.getElementById("burst-limit");

  if (!select.value) {
    console.log("Error: Selección no válida para el límite de burst");
    return;
  }

  input.value = select.value;

  var uploadburstLimit = document.getElementById("upload-burst-limit");
  var downloadburstLimit = document.getElementById("download-burst-limit");

  uploadburstLimit.textContent = select.value;
  downloadburstLimit.textContent = select.value;

  console.log("Burst Limit establecido:", select.value);

  setMaxLimit();
}

function calcularBurstTime(
  intervalBonusValue,
  burstLimitValue,
  burstThresholdValue,
  burstTime
) {
  console.log("Calculando Burst Time");

  var burstLimitNumeric = parseFloat(burstLimitValue) * 1000;

  if (
    !isNaN(intervalBonusValue) &&
    !isNaN(burstLimitNumeric) &&
    !isNaN(burstThresholdValue) &&
    burstThresholdValue !== 0
  ) {
    var burstTimeValue =
      (burstLimitNumeric * intervalBonusValue) / burstThresholdValue;

    console.log("Burst Time Calculado:", Math.ceil(burstTimeValue));

    burstTime.textContent = Math.ceil(burstTimeValue);
  } else {
    console.log("Error en cálculo de Burst Time");
    burstTime.textContent = "";
  }
}

function copiarTexto() {
  var texto = document.getElementById("resultado-texto");

  navigator.clipboard.writeText(texto.value).then(
    function () {
      console.log("Texto copiado al portapapeles");
    },
    function (err) {
      console.error("Error al copiar texto: ", err);
    }
  );
}

function copiarTextokb() {
  var texto = document.getElementById("resultado-texto-kb");

  navigator.clipboard.writeText(texto.value).then(
    function () {
      console.log("Texto copiado al portapapeles");
    },
    function (err) {
      console.error("Error al copiar texto: ", err);
    }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("Página cargada, iniciando cálculo");
  setMaxLimit();
});
