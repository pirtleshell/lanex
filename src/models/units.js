const formatCoords = function (what, n) {
  // what is 'dec' or 'RA' and determines units
  // dec converts 123456.7 to "12 34 56.7"
  // RA converts 123456.7 to "12 34 56.7"

  var s;
  var out = "";
  var isDec = what === "dec";
  if (isDec) {
    if (n < 0) {
      out = "−";
      n *= -1;
    } else {
      out = "+";
    }
  } else if (what != "RA") {
    console.error(
      'Invalid input: formatCoords expects "dec" or "RA", got',
      what
    );
  }

  var str = function (num) {
    return num >= 10 ? "" + num : num >= 1 ? "0" + num : "00";
  };

  s = Math.floor(n / 10000);
  n -= s * 10000;
  out += str(s);

  if (isDec) out += "° ";
  else out += "h ";

  s = Math.floor(n / 100);
  n -= s * 100;
  out += str(s);

  if (isDec) out += "' ";
  else out += "m ";

  s = Math.floor(n);
  n -= s;
  out += str(s);

  if (isDec) out += '"';
  else out += "." + Math.round(n * 10) + "s";

  return out;
};

export const formatDec = function (n) {
  return formatCoords("dec", n);
};

export const formatRA = function (n) {
  return formatCoords("RA", n);
};
