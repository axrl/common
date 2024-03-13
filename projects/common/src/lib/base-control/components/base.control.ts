import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Injector,
    Input,
    Optional,
    Output,
    Renderer2,
} from '@angular/core';
import {
    COMPOSITION_BUFFER_MODE,
    ControlValueAccessor,
    DefaultValueAccessor,
    NgControl,
} from '@angular/forms';
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
export abstract class CommonBaseControl<TValue>
    extends DefaultValueAccessor
    implements ControlValueAccessor
{
    /** Сервис для генерации GUID */
    protected readonly _generateUUIDHelper: GenerateUUIDService;
    /** Ссылка на DOM-элемент, соответствующий компоненту */
    protected readonly __elementRef: ElementRef<HTMLElement>;

    /** ChangeDetectorRef, Доступный для вызова любым классом-наследником */
    protected readonly _cdr: ChangeDetectorRef;
    /** Renderer2, Доступный для вызова любым классом-наследником */
    protected readonly __renderer: Renderer2;
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
            this.onChange(value);
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

    constructor(
        inj: Injector,
        /** Renderer2, Доступный для вызова любым классом-наследником */
        _renderer: Renderer2,
        /** Ссылка на DOM-элемент, соответствующий компоненту */
        _elementRef: ElementRef<HTMLElement>,
        @Optional() @Inject(COMPOSITION_BUFFER_MODE) _compositionMode: boolean,
    ) {
        super(_renderer, _elementRef, _compositionMode);
        this._cdr = inj.get(ChangeDetectorRef);
        this.__elementRef = _elementRef;
        this.__renderer = _renderer;
        this._generateUUIDHelper = inj.get(GenerateUUIDService);
        this.id = this._generateUUIDHelper.getGUID();
        this.ngControl = inj.get(NgControl, undefined, {optional: true, self: true});

        if (this.ngControl !== null) {
            // Setting the value accessor directly (instead of using
            // the providers) to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }
}
