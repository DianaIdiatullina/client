<template>
    <form
        :method="method"
        :action="url"
        :class="[className, { 'is-loading': loading }]"
        v-on="listeners"
    >
        <div
            v-if="errorsList.length"
            class="px-4 py-2 text-sm bg-error mb-2 rounded-sm"
        >
            <p v-for="(err, i) in errors" :key="i">
                {{ err }}
            </p>
        </div>
        <slot />
    </form>
</template>

<script>
import { AwForm as _config } from './_config'
import { conf } from '../assets/js/component'
import { isFalsy } from 'rambdax'

export default {
    name: 'AwForm',

    _config,

    props: {
        url: String,

        method: {
            type: String,
            default() {
                return conf(this, 'method')
            },
            validatior(method) {
                return ['get', 'post', 'delete', 'patch'].includes(
                    method.toLowerCase()
                )
            }
        },

        className: {
            type: String,
            default() {
                return conf(this, 'baseClass')
            }
        }
    },

    data() {
        return {
            loading: false,
            errors: null
        }
    },

    computed: {
        listeners() {
            return {
                mousedown: this._onSubmitBtnClick,
                submit: this._submit,
                ...this.$listeners
            }
        },

        errorsList() {
            if (!isFalsy(this.errors)) {
                return Object.values(this.errors).filter(Boolean)
            }
            return []
        }
    },

    methods: {
        _onSubmitBtnClick(e) {
            if (e.target && e.target.closest('[type="submit"]')) {
                this.resetErrors()
            }
        },

        _submit() {
            const handler = conf(this, 'submit', function() {})
            return handler.apply(this, arguments)
        },

        resetErrors() {
            const fields = this.$el.elements

            // reset errors
            for (let i = 0, max = fields.length; i < max; i++) {
                const field = fields[i]
                if (typeof field.setCustomValidity === 'function') {
                    field.setCustomValidity('')
                    field.dispatchEvent(new Event('invalid'))
                }
            }
        },

        setErrors() {
            const handler = conf(this, 'setErrors', function(errors) {
                this.errors = errors
            })
            return handler.apply(this, arguments)
        }
    }
}
</script>
