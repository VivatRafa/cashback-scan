export namespace RegExpStringTransformer {
    export function to(value: RegExp): string {
        try {
            return value.toString();
        } catch (e) {
            throw new Error(e);
        }
    }

    export function from(value: string): RegExp {
        try {
            const match = value.match(/^\/(.*)\/(.*)$/);
            if (match) {
                const [, pattern, flags] = match;
                return new RegExp(pattern, flags);
            } else {
                throw new Error(`"${value}" is not a regular expression`);
            }
        } catch (e) {
            return new RegExp(value.slice(1, -3).replace(/\\-/g, '-'), 'iu');
        }
    }
}
