import {Component} from '@angular/core';

@Component({
    template: `
        <ul>
            <li *ngFor="let item of items; ngForTrackByProperty: 'id'">
                {{ item.id }}
            </li>
        </ul>
    `,
})
class TestComponent {
    public items = [{id: 1}, {id: 2}, {id: 3}];
}
