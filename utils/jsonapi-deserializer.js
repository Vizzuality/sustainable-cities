export default (jsonapi) => {
  const isCollection = Array.isArray(jsonapi.data);

  const included = jsonapi.included.concat(
    isCollection ? jsonapi.data : [jsonapi.data]
  ).map(record => ({
    relationships: record.relationships,
    deserialized: {
      type: record.type,
      id: record.id,
      ...record.attributes,
    },
  }));

  const findRecord = (primaryKey) => (
    included.find(record =>
      record.deserialized.id === primaryKey.id &&
      record.deserialized.type === primaryKey.type
    ).deserialized
  );

  included.forEach(record => {
    Object.entries(record.relationships || {}).forEach(([name, associations]) => {
      if (!associations.data) {
        record.deserialized[name] = null;
      } else if (Array.isArray(associations.data)) {
        record.deserialized[name] = associations.data.map(findRecord);
      } else {
        record.deserialized[name] = findRecord(associations.data);
      }
    });
  });

  if (isCollection) {
    return included.slice(included.length - jsonapi.data.length).map(r => r.deserialized);
  } else {
    return included[included.length - 1].deserialized;
  }
};
