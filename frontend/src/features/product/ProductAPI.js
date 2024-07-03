export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}

  let queryString = "";

  // Handle filters
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      for (let value of categoryValues) {
        queryString += `${key}=${value}&`;
      }
    }
  }

  // Handle sorting
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  // Handle pagination
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  // Remove the trailing '&'
  queryString = queryString.slice(0, -1);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "http://localhost:8080/products?" + queryString
      );
      const data = await response.json();

      // Log headers for debugging
      console.log([...response.headers.entries()]);

      const totalItems = 100;
      resolve({ data: { products: data, totalItems: +totalItems } });
    } catch (error) {
      reject(error);
    }
  });
}


// export function fetchCategories() {
//   return new Promise(async (resolve) => {
//     const response = await fetch("http://localhost:8080/categories");
//     const data = await response.json();
//     resolve({ data });
//   });
// }

// export function fetchBrands() {
//   return new Promise(async (resolve) => {
//     const response = await fetch("http://localhost:8080/brands");
//     const data = await response.json();
//     resolve({ data });
//   });
// }
