function createCheckBoxItem(label, value, index) {
  return `<li><input type="checkbox" id="${label}${index}" name="${label}${index}" value="${value}">
<label for="${label}${index}">${label}</label><br>`;
}

class Filter {
  constructor(products) {
    this.originalProducts = products.ranked_list;
    this.products = Object.assign([], products.ranked_list);
    this.filterOptions = {};
    this.selectedProducts = [];
    this.selectedAvailability = [];
    this.selectedColorFamily = [];
    this.createFilterOptions();
  }

  createFilterOptions() {
    const properties = ["price", "productTypes", "availability", "colorFamily"];
    properties.forEach((property) => {
      this.filterOptions[property] = [];
      this.populateOptions(property);
    });
  }

  populateOptions(property) {
    switch (property) {
      case "price":
        this.populateOptionsForPrice();
        break;
      case "productTypes":
        this.populateOptionsForProductTypes();
        break;
      case "availability":
        this.populateOptionsForAvailability();
        break;
      case "colorFamily":
        this.populateOptionsForColorFamily();
        break;
      default:
      // code block
    }
  }

  populateOptionsForPrice() {
    this.filterOptions.price = {
      minPrice: 0,
      maxPrice: 0
    };

    this.products.forEach((item) => {
      this.filterOptions.price.maxPrice = Math.max(
        this.filterOptions.price.maxPrice,
        item.price
      );
    });
  }

  populateOptionsForProductTypes() {
    this.products.forEach((item) => {
      if (!this.filterOptions.productTypes.includes(item.product_type)) {
        this.filterOptions.productTypes.push(item.product_type);
      }
    });
  }

  populateOptionsForAvailability() {
    this.filterOptions.availability = [
      {
        label: "Available",
        value: "0"
      },
      {
        label: "Not Available",
        value: "1"
      }
    ];
  }

  populateOptionsForColorFamily() {
    this.products.forEach((item) => {
      const variants = JSON.parse(item.variants);
      variants.forEach((variant) => {
        if (!this.filterOptions.colorFamily.includes(variant.sku)) {
          this.filterOptions.colorFamily.push(variant.sku);
        }
      });
    });
  }

  renderOptions($) {
    this.renderPriceRange($);
    this.renderProductTypes($);
    this.renderAvailibilty($);
    this.renderColorFamily($);
  }

  renderPriceRange($) {
    $("#myRange").prop("max", this.filterOptions.price.maxPrice);
    $("#myRange").prop("min", this.filterOptions.price.minPrice);
    $("#myRange").prop("value", this.filterOptions.price.maxPrice);
  }
  renderProductTypes($) {
    //ProductList
    var productList = "";
    this.filterOptions.productTypes.forEach((productType, index) => {
      productList += createCheckBoxItem(productType, productType, index);
    });
    $(".product_type").html(productList);
  }

  renderAvailibilty($) {
    //Availability
    var availabilityList = "";
    this.filterOptions.availability.forEach((availability, index) => {
      availabilityList += createCheckBoxItem(
        availability.label,
        availability.value,
        index
      );
    });
    $(".availablility").html(availabilityList);
  }
  //Color Family

  renderColorFamily($) {
    var colorFamilyList = "";
    this.filterOptions.colorFamily.forEach((colorFamily, index) => {
      colorFamilyList += createCheckBoxItem(colorFamily, colorFamily, index);
    });
    $(".color_family").html(colorFamilyList);
  }

  onPriceChange($, e) {
    var value = e.target.value;

    this.products = [];
    this.originalProducts.forEach((item) => {
      if (parseInt(item.price, 10) <= value) {
        this.products.push(item);
      }
    });

    this.createFilterOptions();
    this.renderProductTypes($);
    this.renderAvailibilty($);
    this.renderColorFamily($);
  }

  onProductSelection($, e) {
    this.selectedProducts.push(e.target.value);
    this.products = [];
    this.originalProducts.forEach((item) => {
      if (this.selectedProducts.includes(item.product_type)) {
        this.products.push(item);
      }
    });

    this.createFilterOptions();
    this.renderPriceRange($);
    this.renderAvailibilty($);
    this.renderColorFamily($);
  }

  onAvailibilitySelection($, e) {
    this.selectedAvailability.push(e.target.value);
    this.products = [];
    this.originalProducts.forEach((item) => {
      if (this.selectedAvailability.includes(item.out_of_stock)) {
        this.products.push(item);
      }
    });

    this.createFilterOptions();
    this.renderPriceRange($);
    this.renderProductTypes($);
    this.renderColorFamily($);
  }

  onColorFamilySelection($, e) {
    this.selectedColorFamily.push(e.target.value);
    this.products = [];
    this.originalProducts.forEach((item) => {
      const variants = JSON.parse(item.variants);
      variants.forEach((variant) => {
        if (!this.selectedColorFamily.includes(variant.sku)) {
          this.products.push(item);
        }
      });
    });

    this.createFilterOptions();
    this.renderPriceRange($);
    this.renderProductTypes($);
    this.renderAvailibilty($);
  }

  bindEventHandler($) {
    $("#myRange").on("change", (e) => {
      this.onPriceChange($, e);
    });

    $(".product_type").on("change", (e) => {
      this.onProductSelection($, e);
    });

    $(".availablility").on("change", (e) => {
      this.onAvailibilitySelection($, e);
    });

    $(".color_family").on("change", (e) => {
      this.onColorFamilySelection($, e);
    });
  }
}

export default Filter;
