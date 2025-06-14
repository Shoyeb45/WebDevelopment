interface Config {
  endpoint: string;
  apiKey: string;
}

const config : Config = {
    endpoint: "https://api.some.com/api/v1/getAllTheUsers",
    apiKey: "dxdveqw124afdasdjasf1231231"
};

// we can update the config

config.endpoint = "sfasf";

// we can user readonly to make it non-updatable

function fetchData(config: Readonly<Config>) {
    console.log("Fetched data");
    // config.apiKey = "";  error

}

fetchData(config)

// another way to define
interface Product {
    readonly id: number,
    productName: string,
    readonly price: number 
}

function doSomethigAgainAgain(product: Product) {
    console.table(product);
    // product.id = 123; error
}

const product: Product = {
    id: 123,
    productName: "Dairy Milk",
    price: 12314
};

doSomethigAgainAgain(product);