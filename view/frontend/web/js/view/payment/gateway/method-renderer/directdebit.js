/**
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is provided with Magento in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 *
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 */

/*browser:true*/
/*global define*/
define(
    [
        'jquery',
        'MultiSafepay_ConnectFrontend/js/view/payment/method-renderer/base-renderer',
        'Magento_Checkout/js/checkout-data',
        'Magento_Checkout/js/action/redirect-on-success',
        'mage/url'
    ],

    /**
     *
     * @param $
     * @param Component
     * @param checkoutData
     * @param redirectOnSuccessAction
     * @param url
     * @returns {*}
     */
    function (
        $,
        Component,
        checkoutData,
        redirectOnSuccessAction,
        url
    ) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'MultiSafepay_ConnectFrontend/payment/gateway/directdebit',
                accountHolderName: '',
                accountHolderIban: '',
                emandate: '',
            },

            initObservable: function () {
                this.observe('accountHolderName')
                    .observe('accountHolderIban')
                    .observe('emandate')
                    ._super();

                return this;
            },

            /**
             * Add payment method specific data to additional data
             *
             * @returns {{additional_data: {account_holder_iban: *, emandate: *, account_holder_name: *}, method: *}}
             */
            getData: function () {
                return {
                    "method": this.item.method,
                    "additional_data": {
                        'account_holder_name': this.accountHolderName(),
                        'account_holder_iban': this.accountHolderIban(),
                        'emandate': this.emandate(),
                    }
                };
            },
        });
    }
);
