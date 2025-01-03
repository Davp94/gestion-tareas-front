import React from 'react';
import { Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';

const InputTextController = ({ name, control, rules, className, disable, maxLength, placeholder, icon, label }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <>
                    <span className="p-float-label p-input-icon-right">
                        {icon && <i className={icon} />}

                        <InputText id={field.name} {...field} placeholder={placeholder} className={className} disabled={disable} maxLength={maxLength} />
                        {label && (
                            <label htmlFor={field.name} className={disable ? 'l-disabled' : ''}>
                                {label}
                            </label>
                        )}
                        {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                    </span>
                </>
            )}
        />
    );
};

export default InputTextController;
