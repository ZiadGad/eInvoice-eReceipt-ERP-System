exports.mapIssuerInput = (payload) => ({
  companyName: payload.companyName,
  type: payload.type ?? "B",
  registrationNumber: payload.registrationNumber,
  taxpayerActivityCode: payload.taxpayerActivityCode,
  address: {
    branchID: payload.address.branchID,
    country: payload.address.country,
    governate: payload.address.governate,
    regionCity: payload.address.regionCity,
    street: payload.address.street,
    buildingNumber: payload.address.buildingNumber,
    postalCode: payload.address.postalCode,
    floor: payload.address.floor,
    room: payload.address.room,
    landmark: payload.address.landmark,
    additionalInformation: payload.address.additionalInformation,
  },
  etaConfig: {
    clientId: payload.etaConfig.clientId,
    clientSecret: payload.etaConfig.clientSecret,
  },
});
