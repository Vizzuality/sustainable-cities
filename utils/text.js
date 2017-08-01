export default function substitution(string, params) {
  // Params should have this format => [{key:'xxx', value:'xxx'},{key:'xxx', value:'xxx'}]
  // Keys to search should be in this format {{key}}
  let str = string;
  params.forEach((param) => {
    str = str.replace(new RegExp(`{{${param.key}}}`, 'g'), param.value);
  });
  return str;
}
