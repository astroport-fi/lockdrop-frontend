/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type QueryMsg =
  | {
      config: {
        [k: string]: unknown;
      };
    }
  | {
      state: {
        [k: string]: unknown;
      };
    }
  | {
      supported_asset: {
        token: string;
        [k: string]: unknown;
      };
    }
  | {
      user_info: {
        address: string;
        token: string;
        [k: string]: unknown;
      };
    }
  | {
      user_info_with_lockups_list: {
        address: string;
        [k: string]: unknown;
      };
    }
  | {
      lock_up_info: {
        duration: number;
        token: string;
        user_address: string;
        [k: string]: unknown;
      };
    };