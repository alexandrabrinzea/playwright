import { expect,test } from "@playwright/test";
import { acceptCookies } from "../utils/helpers";
import { ProductDetailPage } from "../pages/productDetailPage";
import { CartPage } from "../pages/cartPage";

test("End-to-End Checkout Process", async ({page})=>{
const productDetailPage = new ProductDetailPage(page);
const cartPage = new CartPage(page);
//Step 1: Open the webshop
await productDetailPage.goToCoffeePage();

//Step 2: Accept cookies
await acceptCookies(page);

//Step 3: Go to the product detail page and add an item to cart
await productDetailPage.assertPageDetail();

//Step 4: Check cart icon displayes a value grater than 0
await productDetailPage.assertCartIsNotEmpty();

//Step 5: Click on cart icon
await productDetailPage.goToCartPage();

//Step 6: Check user is redirect to the correct page
await cartPage.checkUrl();

//Step 7: Check cart page is not empty
await cartPage.assertNotEmptyPage();

//Step 8: Initiate the checkout process as gues
await cartPage.goToCheckoutProcess();

//Step 9: Enter the required shipping information 
await cartPage.enterOrderInformation();

//Step 10: Select the payment method - card
await cartPage.selectPaymentMethod();

//Step 11: Check details on order confirmation page
await cartPage.checkOrderConfirmation();
//await page.pause();
})