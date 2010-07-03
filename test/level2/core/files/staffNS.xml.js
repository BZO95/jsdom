var sys = require("sys"),
    dom = require(__dirname + "/../../../../lib/jsdom/level2/core").dom.level2.core;

exports.staffNS = function() {
  
  var doc = new dom.Document("staff");
  
  var implementation = new dom.DOMImplementation(doc, {
    "XML" : "1.0",
    "core" : "2.0"
  });
  
  var notations = new dom.NotationNodeMap(
    doc,
    doc.createNotationNode("notation1","notation1File", null),
    doc.createNotationNode("notation2",null, "notation2File")
  );



//<entElement domestic='Yes'>Element data</entElement><?PItarget PIdata?>  
  var entElement = doc.createElement("entElement");
  entElement.setAttribute("domestic", "Yes");
  entElement.appendChild(doc.createTextNode("Element data"));
  var procElement = doc.createProcessingInstruction("PItarget", "PfIdata");
  var ent4 = doc.createEntityNode("ent4",entElement, procElement);

  var ent5 = doc.createEntityNode("ent5");
  ent5.publicId = "entityURI";
  ent5.systemId = "entityFile";
  ent5.notationName = "notation1";
  
  var entities = new dom.EntityNodeMap(
    doc,
    doc.createEntityNode("ent1", doc.createTextNode("es")),
    doc.createEntityNode("ent2",doc.createTextNode("1900 Dallas Road")),
    doc.createEntityNode("ent3",doc.createTextNode("Texas")),
    ent4,
    ent5
  );
  
  var defaultAttributes = new dom.NamedNodeMap(doc);
  var entElement = doc.createElement("entElement");
  entElement.setAttribute("attr1", "Attr");
  entElement.setAttribute("domestic", "MALE");
  defaultAttributes.setNamedItem(entElement);    

  var defaultAddress = doc.createElement("address");
  defaultAddress.setAttribute("street", "Yes");
  defaultAttributes.setNamedItem(defaultAddress);

  doc.doctype = new dom.DocumentType(doc, "staff", entities, notations, defaultAttributes);
  doc.doctype._systemId = "staffNS.dtd";
  doc.implementation = implementation;  
  
  var staff     = doc.createElement("staff");

  var employee, address, name, position,gender,id, salary;

  /************************************
  *          EMPLOYEEE 1              *
  ************************************/
  employee = doc.createElement("employee");
  address  = doc.createElement("address");
  name     = doc.createElement("name");
  position = doc.createElement("position");
  gender   = doc.createElement("gender");
  id       = doc.createElement("employeeId");
  salary   = doc.createElement("salary");

  employee.appendChild(id);
  employee.appendChild(name);
  employee.appendChild(position);
  employee.appendChild(salary);
  employee.appendChild(gender);
  employee.appendChild(address);
  staff.appendChild(employee);

  employee.namespaceURI = "http://www.nist.gov";
  employee.setAttributeNS("http://www.nist.gov", "xmlns:dmstc", "http://www.usa.com");

  id.appendChild(doc.createTextNode("EMP0001"));
  salary.appendChild(doc.createTextNode("56,000"));
  address.appendChild(doc.createTextNode('1230 North Ave. Dallas, Texas 98551'));
  address.setAttributeNS("http://www.usa.com", "dmstc:domestic", "Yes");
  name.appendChild(doc.createTextNode("Margaret Martin"));
  gender.appendChild(doc.createTextNode("Female"));
  position.appendChild(doc.createTextNode("Accountant"));

  /************************************
  *          EMPLOYEEE 2              *
  ************************************/
  employee = doc.createElement("employee");
  address  = doc.createElement("address");
  name     = doc.createElement("name");
  position = doc.createElement("position");
  gender   = doc.createElement("gender");
  id       = doc.createElement("employeeId");
  salary   = doc.createElement("salary");

  employee.appendChild(id);
  employee.appendChild(name);
  employee.appendChild(position);
  employee.appendChild(salary);
  employee.appendChild(gender);
  employee.appendChild(address);
  staff.appendChild(employee);

  employee.setAttributeNS("http://www.nist.gov", "xmlns:dmstc", "http://www.usa.com");
  id.appendChild(doc.createTextNode("EMP0002"));
  salary.appendChild(doc.createTextNode("35,000"));
  address.setAttributeNS("http://www.usa.com", "dmstc:domestic", "Yes");
  address.setAttribute("street", "Yes");
  address.appendChild(doc.createEntityReference("ent2"));
  address.appendChild(doc.createTextNode(" Dallas, "));
  address.appendChild(doc.createEntityReference("ent3"));
  address.appendChild(doc.createTextNode("\n 98554"));
  
  name.appendChild(doc.createTextNode("Martha Raynolds"));
  name.appendChild(doc.createCDATASection("This is a CDATASection with EntityReference number 2 &ent2;"));
  name.appendChild(doc.createTextNode("\r\n"));
  name.appendChild(doc.createCDATASection("This is an adjacent CDATASection with a reference to a tab &tab;"));  
  gender.appendChild(doc.createTextNode("Female"));
  position.appendChild(doc.createTextNode("Secretary"));


  /************************************
  *          EMPLOYEEE 3              *
  ************************************/
  employee = doc.createElement("employee");
  address  = doc.createElement("address");
  name     = doc.createElement("name");
  position = doc.createElement("position");
  gender   = doc.createElement("gender");
  id       = doc.createElement("employeeId");
  salary   = doc.createElement("salary");

  employee.appendChild(id);
  employee.appendChild(name);
  employee.appendChild(position);
  employee.appendChild(salary);
  employee.appendChild(gender);
  employee.appendChild(address);
  staff.appendChild(employee);
  employee.setAttributeNS("http://www.nist.gov", "xmlns:dmstc", "http://www.usa.com");
  id.appendChild(doc.createTextNode("EMP0003"));
  salary.appendChild(doc.createTextNode("100,000"));
  address.setAttributeNS("http://www.usa.com", "dmstc:domestic", "Yes");
  address.setAttribute("street", "No");
  address.appendChild(doc.createTextNode("PO Box 27 Irving, texas 98553"));
  name.appendChild(doc.createTextNode("Roger\n Jones")) ;
  gender.appendChild(doc.createEntityReference("ent4"));
  position.appendChild(doc.createTextNode("Department Manager"));

  /************************************
  *          EMPLOYEEE 4              *
  ************************************/
  employee = doc.createElementNS("http://www.nist.gov", "emp:employee");
  address  = doc.createElementNS("http://www.nist.gov", "emp:address");
  name     = doc.createElementNS("http://www.altavista.com", "nm:name");
  position = doc.createElementNS("http://www.nist.gov", "emp:position");
  gender   = doc.createElementNS("http://www.nist.gov", "emp:gender");
  id       = doc.createElementNS("http://www.nist.gov", "emp:employeeId");
  salary   = doc.createElementNS("http://www.nist.gov", "emp:salary");

  employee.appendChild(id);
  employee.appendChild(name);
  employee.appendChild(position);
  employee.appendChild(salary);
  employee.appendChild(gender);
  employee.appendChild(address);
  staff.appendChild(employee);

  employee.setAttribute("xmlns:emp", "http://www.usa.com");
  employee.setAttribute("xmlns:nm", "http://www.altavista.com");
  id.appendChild(doc.createTextNode("EMP0004"));
  salary.appendChild(doc.createTextNode("95,000"));
  address.setAttribute("emp:domestic", "Yes");
  address.setAttribute("emp:street", "Y");
  var ent1Ref = doc.createEntityReference("ent1");
  //address.attributes.getNamedItem("street").childNodes.push(ent1Ref);
  address.appendChild(doc.createTextNode("27 South Road. Dallas, Texas 98556"));
  name.appendChild(doc.createTextNode("Jeny Oconnor"));
  gender.appendChild(doc.createTextNode("Female"));
  position.appendChild(doc.createTextNode("Personal Director"));

  /************************************
  *          EMPLOYEEE 5              *
  ************************************/
  employee = doc.createElement("employee");
  address  = doc.createElement("address");
  name     = doc.createElement("name");
  position = doc.createElement("position");
  gender   = doc.createElement("gender");
  id       = doc.createElement("employeeId");
  salary   = doc.createElement("salary");

  employee.appendChild(id);
  employee.appendChild(name);
  employee.appendChild(position);
  employee.appendChild(salary);
  employee.appendChild(gender);
  employee.appendChild(address);
  staff.appendChild(employee);

  id.appendChild(doc.createTextNode("EMP0005"));
  salary.appendChild(doc.createTextNode("90,000"));
  address.setAttribute("street", "Yes");
  address.appendChild(doc.createTextNode("1821 Nordic. Road, Irving Texas 98558"));
  name.appendChild(doc.createTextNode("Robert Myers"));
  gender.appendChild(doc.createTextNode("male"));
  position.appendChild(doc.createTextNode("Computer Specialist"));

  doc.appendChild(doc.createProcessingInstruction("TEST-STYLE", "PIDATA"));
  doc.appendChild(doc.createComment(" This is comment number 1."));
  doc.appendChild(staff);

  doc.normalize();
  return doc;
};
