import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Injector,
    Input,
    Output,
    Renderer2,
} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {isEqualItems} from '../../functions';
import {GenerateUUIDService} from '../../services/generate-uuid';

/** Базовый класс для компонентов, реализующих функционал ControlValueAccessor. */
@Directive({
    host: {
        /**
         * Нативные параметры html-элементов, которые будут перезаписаны инпут-параметрами Angular,
         * должны быть синхронизированы с нативным элементом. В противном случае привязки свойств для них не работают.
         * Критично для случаев, если класс-наследник будет использоваться в качестве директивы.
         */
        '[id]': 'id',
        '[attr.disabled]': 'disabled',
        '[attr.id]': 'id',
        '[attr.name]': 'name || null',
    },
})
export abstract class CommonBaseControl<TValue> implements ControlValueAccessor {
    /** Сервис для генерации GUID */
    protected _generateUUIDHelper: GenerateUUIDService;
    /** Ссылка на DOM-элемент, соответствующий компоненту */
    protected _elementRef: ElementRef<HTMLElement>;
    /** ChangeDetectorRef, Доступный для вызова любым классом-наследником */
    protected _cdr: ChangeDetectorRef;
    /** Renderer2, Доступный для вызова любым классом-наследником */
    protected _renderer: Renderer2;
    /** Отключение компонента */
    protected _disabled = false;
    protected _value: TValue | null = null;
    /** ngControl, ассоциированный с компонентом */
    ngControl: NgControl | null;

    /** Установить значение */
    @Input() set value(value: TValue | null) {
        if (!isEqualItems(this._value, value)) {
            this._value = value;
            this.valueChanges.emit(value);
            this._onChange(value);
            this._cdr.markForCheck();
        }
    }

    /** Получить значение */
    get value(): TValue | null {
        return this._value;
    }

    /** Tabindex attribute */
    @Input() tabIndex: number = 0;

    /** Атрибут name */
    @Input() name: string | null = null;

    /** Атрибут id */
    @Input() id: string;

    /** Установить значение disabled */
    @Input() set disabled(disabled: boolean) {
        this._disabled = disabled;
    }

    /** Текущее значение disabled */
    get disabled(): boolean {
        return this._disabled;
    }

    /** Флаг возможности фокусировки на компоненте */
    get focusable(): boolean {
        return !this.disabled;
    }

    /** Emit changes in control */
    @Output() readonly valueChanges = new EventEmitter<TValue | null>();

    constructor(inj: Injector) {
        this._elementRef = inj.get<ElementRef<HTMLElement>>(ElementRef);
        this._cdr = inj.get(ChangeDetectorRef);
        this._renderer = inj.get(Renderer2);
        this._generateUUIDHelper = inj.get(GenerateUUIDService);
        this.id = this._generateUUIDHelper.getGUID();
        this.ngControl = inj.get(NgControl, undefined, {optional: true, self: true});

        if (this.ngControl !== null) {
            // Setting the value accessor directly (instead of using
            // the providers) to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }

    /** @inheritDoc */
    writeValue(value: TValue | null): void {
        this._value = value;
        this._cdr.markForCheck();
    }

    /** @inheritDoc */
    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    /** @inheritDoc */
    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    /** @inheritDoc */
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._cdr.markForCheck();
    }

    /** @inheritDoc */
    protected _onChange(_: any): void {}

    /** @inheritDoc */
    protected _onTouched(): void {}
}
