const Demande = require("../models/demandeModel");
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


app.use(methodOverride('_method'));


//@description     Fetch single Demande
//@route           GET /api/demandes/:id
//@access          Public
const getDemandes = async (req, res) => {
  const demande = await Demande.find();
  if (demande) {
    return res.json(demande);
  } else {
    return res.status(404).json("Demandes not found");
  }
};

const getDemandeById = async (req, res) => {
  const demande = await Demande.findById(req.params.id);
  if (demande) {
    return res.json(demande);
  } else {
    return res.status(404).json("Demande not found");
  }
};

//@description     Create single demande
//@route           POST /api/demandes/create
//@access          Private
const CreateDemande = async (req, res) => {
  const body = req.body;
  if (!body) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const demande = new Demande({
      nom:body.nom,
      procedure:body.procedure,
      procedureId:body.procedureId
    });
    const createdDemande = await demande.save();

    res.status(201).json(createdDemande);
  }
};

//@description     Modift single demande
//@route           PUT /api/demandes/:id
//@access          Private
const modifyDemande = async (req, res) => {
  const demande = await Demande.findByIdAndUpdate(req.params.id, {nom: req.body.nom, procedure: req.body.procedure});
  if (demande) {
    return res.json(demande);
  } else {
    return res.status(404).json("Demande not found");
  }
};

//@description     Delete single demande
//@route           GET /api/demandes/:id
//@access          Private
const DeleteDemande = async (req, res) => {
  const demande = await Demande.findById(req.params.id);

  if (demande) {
    await demande.remove();
    res.json("Demande Removed");
  } else {
    res.status(404);
    throw new Error("Demande not Found");
  }
};

module.exports = { getDemandes, getDemandeById, CreateDemande, modifyDemande, DeleteDemande };