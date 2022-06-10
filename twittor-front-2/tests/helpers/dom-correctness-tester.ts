import { VueWrapper } from '@vue/test-utils/dist/vueWrapper';

type Rule = {
  selector: string;
  text?: string;
  attrs?: Record<string, any>;
}

type RuleBuilder = {
  build: () => Rule;
  text: (v: string) => RuleBuilder;
  attr: (key: string, value: any) => RuleBuilder;
};

export const rule = (selector: string): RuleBuilder => {
  const data: Omit<Rule, 'selector'> = {
    attrs: {} as Record<string, any>,
  };
  return {
    text: function(value) {
      data.text = value;
      return this;
    },
    attr: function(key, value) {
      (data.attrs as Record<string, any>)[key] = value;
      return this;
    },
    build: function() {
      return {
        selector,
        ...data,
      };
    },
  };
};

/**
 * @example
 *    const wrapper = shallowMount(MyComponent)
 *    new DomCorrectnessTester(wrapper)
 *     .addRules([
 *      rule('h1.title').text('Sign Up'), // Check exists and text
 *      rule('.info'),                    // Check exists
 *      rule('input.password')            // Check exists and attributes
 *       .attr('type', 'password')
 *       .attr('placeholder', 'Password'),
 *      ]).test();
 */
export class DomCorrectnessTester {
  private rules: Rule[] = [];
  constructor(private wrapper: VueWrapper) {}

  addRules(rules: (Rule | RuleBuilder)[]) {
    this.rules = [
      ...this.rules,
      ...rules.map((rule) => {
        const isBuilder = typeof (rule as any).build === 'function';
        return isBuilder ? (rule as RuleBuilder).build() : rule as Rule;
      })
    ];
    return this;
  };

  test() {
    this.rules.forEach(({ selector, text, attrs }) => {
      const found = this.wrapper.find(selector);
      expect(found.exists()).toBeTruthy();
      if (text) {
        expect(found.text()).toBe(text);
      }
      if (attrs) {
        Object
          .entries(attrs)
          .forEach(([name, value]) => {
            expect(found.element.getAttribute(name)).toBe(value);
          });
      }
    });
  }
}
