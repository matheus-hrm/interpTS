
/**
 * function main < >
    begin
        a = 2 !
        a = 5.0 + 4 !
        return a !
    end
 */



export enum TokenType {
    FunctionKeyword,
    Number,
    Identifier,
    Equals,
    OpenParen,
    CloseParen,
    BinaryOperator,
    var,
    LessThan,
    GreaterThan,
    ExclamationMark,
    ReturnKeyword,
    BeginKeyword,
    EndKeyword,
}

export interface Token {
    type: TokenType;
    value: string;
}

const KEYWORDS: Record<string, TokenType> = {
    'var': TokenType.var,
}

function token(type: TokenType, value = ''): Token {
    return { type, value };
}

function isSpace(char: string) {
    return char === ' ' || char === '\t' || char === '\n';
}

function isAlpha(char: string) {
    return char.toUpperCase() !== char.toLowerCase();
}

function isInt (str: string) {
    const c = str.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
    return c >= bounds[0] && c <= bounds[1];
}

export function Tokenize(code: string): Token[] {

    const tokens = new Array<Token>();
    const src = code.split('');

    while (src.length > 0) {
        if (src[0] === '(') {
            tokens.push(token(TokenType.OpenParen, src.shift()))
        } else if (src[0] === ')') {
            tokens.push(token(TokenType.CloseParen, src.shift()))
        } else if (src[0] === '<') {
            tokens.push(token(TokenType.LessThan, src.shift()))
        } else if (src[0] === '>') {
            tokens.push(token(TokenType.GreaterThan, src.shift()))
        } else if (src[0] === '=') {
            tokens.push(token(TokenType.Equals, src.shift()))
        } else if (src[0] === '+' || src[0] === '-' || src[0] === '*' || src[0] === '/') {
            tokens.push(token(TokenType.BinaryOperator, src.shift()))
        } else if (src[0] === '!') {
            tokens.push(token(TokenType.ExclamationMark, src.shift()))
        } else {

            if (isInt(src[0])) {
                let num = '';
                while (src.length > 0 && isInt(src[0])) {
                    num += src.shift();
                }
                tokens.push(token(TokenType.Number, num));
            } else if (isAlpha(src[0])) {
                let id = '';
                while (src.length > 0 && isAlpha(src[0])) {
                    id += src.shift();
                }
                tokens.push(token(TokenType.Identifier, id));
                
                const reserved = KEYWORDS[id];
                if (reserved === undefined) {
                    tokens.push(token(TokenType.Identifier, id));
                } else {
                    tokens.push(token(reserved, id));
                }
            } else if (isSpace(src[0])) {
                src.shift();
            } else {
                console.log('Unexpected token: ' + src[0]);
            }
        }   
    }
    return tokens;
}

console.log(Tokenize(
`function main < >
    begin
        a = 2 !
        
        return a !
    end
`))