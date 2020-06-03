/**
 * Model: Shared modal serive model
 * Details: Interface defination of modal contents, buttons ,ComponentProps
 * Date: February 12, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */

/**
 *
 *
 * @export
 * @interface IContent
 * title: modal title
 * details: i18n translation file object properties name [optional]
 * values: translation properties dynamic values. Example values: { interestRate: '0', minimumValue: '1.00'}
 * [usage] In translation file file [en-us.json], write as 'This is a {{ interestRate }}% and {{ minimumValue }}'
 */
export interface IContent {
  title?: string;
  details?: string[];
  values?: {
    [key: string]: string;
  };
}

export interface IButton {
  text: string;
  params?: { [key: string]: string | number };
  cssClass: string;
  disabled?: boolean;
  handler: ($event) => void;
}
export interface IMeedModalContent {
  fullScreen?: boolean;
  contents?: IContent[];
  actionButtons?: IButton[];
  onDidDismiss?: (data) => void;
  data?: any;
}

export interface IMeedModalComponentProps {
  componentProps: IMeedModalContent;
}
export interface ICurrencyFormat {
  style: string;
  currency: string;
  minimumFractionDigits: number;
  maximumFractionDigits: number;
  currencyDisplay: string;
}
