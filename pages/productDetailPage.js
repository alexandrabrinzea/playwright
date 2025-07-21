import {expect} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { BasePage } from './basePage';

export class ProductDetailPage {
        constructor(page) {
        this.page = page;
        this.basePage = new BasePage(this.page);
        this.coffeeOptionsGrid = page.locator('#teaser-grid');
        this.allCoffeeOption = page.locator('.teaser__link').getByText('Alle Kaffees');
        this.capsulesOption = page.locator('.teaser__link').getByText('Cafissimo Kaffeekapseln');
        this.favoriteCapsule = page.locator('.product-title').getByText('Cafissimo BARISTA Espresso Brasil - 10 Kapseln');
        this.productTitle = page.locator('.wrapper__pdp-buybox__title-rating').getByText('Cafissimo BARISTA Espresso Brasil - 10 Kapseln');
        this.addToCart = page.getByRole('button', { name: 'In den Warenkorb' });
        this.modal = page.locator('.tp-modal-mask');
        this.closeModal = page.locator('.tp-modal-close');
        this.cartIcon = page.locator('#c-header2020-icon--basket');
        }

async goToCoffeePage(){
    await this.basePage.goto('https://www.tchibo.de/c/kaffee');
}

async assertCoffeeOption(){
    await this.allCoffeeOption.toBeVisible();
}

async assertPageDetail(){
    await expect(this.allCoffeeOption).toBeVisible();
    await this.allCoffeeOption.click();
    await expect(this.capsulesOption).toBeVisible()
    await this.capsulesOption.click();
    //await this.page.pause();
    await expect(this.favoriteCapsule).toBeVisible()
    await this.favoriteCapsule.click();
    await expect(this.productTitle).toBeVisible();
    await this.addToCart.scrollIntoViewIfNeeded();
    await expect(this.addToCart).toBeVisible();
    await this.addToCart.scrollIntoViewIfNeeded();
    await this.addToCart.click();
    //await this.page.pause();
    await expect(this.modal).toBeVisible();
    await this.closeModal.click();
    await expect(this.modal).not.toBeVisible();
}

async assertCartIsNotEmpty(){
    await expect(this.cartIcon).toBeVisible();
    this.cartIconValue = await this.cartIcon.textContent();
    this.cartIconValueInt = parseInt(this.cartIconValue || '0', 10);
    await expect(this.cartIconValueInt).toBeGreaterThan(0);
}

 async goToCartPage(){
    await this.cartIcon.click();
}}