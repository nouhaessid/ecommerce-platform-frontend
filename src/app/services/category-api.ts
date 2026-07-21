import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class CategoryApi {
    private categories = ['all', 'electronics', 'clothing', 'home','sports']

    getCategories() {
        return this.categories;
    }
}