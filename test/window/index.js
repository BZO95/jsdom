exports.tests = {
 addmetatohead : function() {
    var meta = window.document.createElement("meta");
    window.document.getElementsByTagName("head")[0].appendChild(meta);
    var elements = window.document.getElementsByTagName("head")[0].childNodes;
    assertTrue("last element should be the new meta tag",
                elements[elements.length-1] === meta);
  }
};
