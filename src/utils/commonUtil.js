const jsonToFormData = (json, formData = new FormData(), parentKey = "") => {
  if (json === null || json === undefined) {
    if (parentKey) formData.append(parentKey, "");
  } else if (Array.isArray(json)) {
    json.forEach((item, index) => {
      const fullKey = parentKey ? `${parentKey}[${index}]` : index;
      jsonToFormData(item, formData, fullKey);
    });
  } else if (json instanceof File || json instanceof Blob) {
    if (parentKey) formData.append(parentKey, json);
  } else if (typeof json === "object") {
    Object.keys(json).forEach((key) => {
      const value = json[key];
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      jsonToFormData(value, formData, fullKey);
    });
  } else {
    if (parentKey) formData.append(parentKey, json);
  }
  return formData;
};

export { jsonToFormData };
