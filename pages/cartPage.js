import {expect} from "@playwright/test";

import { BasePage } from "./basePage";

export class CartPage {
    constructor(page) {
        this.page = page;
        this.emptyCart = this.page.locator(".c-empty-cart-title");
        this.goToCheckout = this.page.getByRole('button', { name: 'Zur Kasse gehen' });
        this.checkoutAsGuest = this.page.getByRole('button', { name: 'Weiter' })
        //this.billingInfoTitle = page.getByRole('main');
        this.salutation = this.page.getByLabel('Anrede'); 
        this.firstName = this.page.getByRole('textbox', { name: 'Vorname*' });
        this.lastName = this.page.getByRole('textbox', { name: 'Nachname*' });
        this.postalCode = this.page.getByRole('spinbutton', { name: 'PLZ*' });
        this.location = this.page.getByRole('textbox', { name: 'Ort*' });
        this.address = this.page.getByRole('textbox', { name: 'Straße und Hausnummer*' });
        this.email = this.page.getByRole('textbox', { name: 'E-Mail-Adresse*' });
        this.acceptAndContinue = this.page.getByRole('button', { name: 'Übernehmen und weiter' }); //getByRole('button', { name: 'Übernehmen und weiter' })
        this.creditCardButton = this.page.getByRole('button', { name: 'Kreditkarte visa' });
        this.invoiceText = this.page.locator('.pmp-content-text');
        this.confirmOrderTitle = this.page.getByText('Stimmt alles? Dann jetzt');
        this.confirmOrderButton = this.page.getByRole('button', { name: 'Zahlungspflichtig bestellen' });
    }

async checkUrl(){
    await this.page.waitForURL("**/service/cartfrontend/cart")
}
async assertNotEmptyPage(){
    await expect(this.emptyCart).not.toBeVisible();
}
async goToCheckoutProcess(){
    await this.goToCheckout.click();
    await this.checkoutAsGuest.click();
    //this.billingInfoTitle = this.page.locator('.page__title');
    //this.billingInfoTitleText = await this.billingInfoTitle.textContent();
    //expect(this.page.billingInfoTitleText).toContainText('Bestellinformationen');

}

async enterOrderInformation(){
    //await this.page.pause();
    await this.salutation.click();
    await this.salutation.selectOption('Frau');
    await this.firstName.fill('TestFirst');
    await this.lastName.fill('TestLast');
    await this.postalCode.fill('01060');
    await this.location.fill('Dresden');
    await this.address.fill('Test, 11');
    await this.email.fill('testyopmail@yopmail.com');
    await this.acceptAndContinue.click();
}

async selectPaymentMethod(){
    await this.creditCardButton.click();
    //await this.page.pause();
    await expect(this.invoiceText).not.toBeVisible();
    await expect(this.acceptAndContinue).toBeVisible();
    await this.acceptAndContinue.click();
}

async checkOrderConfirmation(){
    await expect(this.confirmOrderTitle).toBeVisible();
    await expect(this.confirmOrderButton).toBeVisible();
}
}