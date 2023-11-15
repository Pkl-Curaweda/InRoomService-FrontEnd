const fs = require('fs');
const { prisma } = require('../configs/prisma.config');
const { errorResponse, successResponse } = require('../utils/helper.util');

const getService = async (req, res) => {
  try {
    const { serviceTypeId } = req.params;
    const { search } = req.query;
    const service = await prisma.service.findMany({
      where: {
        serviceTypeId: parseInt(serviceTypeId, 10),
        name: {
          contains: search,
        },
      },
    });

    return successResponse(
      res,
      `Service ${req.params.serviceTypeId} has been getted successfully`,
      service,
      200,
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Service not found', '', 404);
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceTypeId } = req.params;
    const service = await prisma.service.findUnique({
      where: {
        id: parseInt(id, 10),
        serviceTypeId: parseInt(serviceTypeId, 10),
      },
    });

    return successResponse(
      res,
      `Service ${req.params.id} has been getted successfully`,
      service,
      200,
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Service not found', '', 404);
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await prisma.service.delete({
      where: { id: parseInt(id, 10) },
    });

    return successResponse(res, 'Service yang dipilih telah dihapus', service, 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Deleting failed', '', 404);
  }
};

const createService = async (req, res) => {
  try {
    const { name, price, desc, serviceTypeId } = req.body;
    const picture = req.file.filename;
    const pictureUrl = `https://${req.headers.host}/uploads/${picture}`;
    const service = await prisma.service.create({
      data: {
        name,
        price: parseInt(price, 10),
        desc,
        picture: pictureUrl,
        serviceTypeId: parseInt(serviceTypeId, 10),
        created_at: new Date(),
      },
    });

    return successResponse(res, 'Create service success', service, 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Create service failed', '', 404);
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.service.findUnique({
      where: { id: parseInt(id, 10) },
    });
    const oldImagePath = item.picture;
    const { name, price, desc, serviceTypeId } = req.body;
    const picture = req.file.path;
    const service = await prisma.service.updateMany({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        price: parseInt(price, 10),
        desc,
        picture,
        serviceTypeId: parseInt(serviceTypeId, 10),
        updated_at: new Date(),
      },
    });

    if (oldImagePath) {
      fs.unlinkSync(oldImagePath);
    }

    return successResponse(res, 'update service success', service, 200);
  } catch (error) {
    return errorResponse(res, 'update service failed', '', 404);
  }
};

module.exports = {
  getService,
  deleteService,
  createService,
  updateService,
  getServiceById,
};
