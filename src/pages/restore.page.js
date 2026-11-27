export class RestorePage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.getInstructionButton = page.getByRole('button', { name: 'Get the instruction' });
    }
}