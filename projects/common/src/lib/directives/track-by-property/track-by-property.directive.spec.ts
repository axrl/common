import {Component} from '@angular/core';

@Component({
    template: `<ul>
        <li *ngFor="let item of items; trackByProperty: 'id'">{{ item.id }}</li>
    </ul>`,
})
class TestPropertyComponent {
    public items = [{id: 1}, {id: 2}, {id: 3}];
}

@Component({
    template: `<ul>
        <li *ngFor="let item of items; trackById">{{ item.id }}</li>
    </ul>`,
})
class TestIdComponent {
    public items = [{id: 1}, {id: 2}, {id: 3}];
}

@Component({
    template: `<ul>
        <li *ngFor="let item of items; trackByIndex">{{ item.id }}</li>
    </ul>`,
})
class TestIndexComponent {
    public items = [{id: 1}, {id: 2}, {id: 3}];
}
