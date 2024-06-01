// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace TokenTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type CallData = {
  id: Scalars['String']['output'];
  functionName: Scalars['String']['output'];
  params: Array<Scalars['String']['output']>;
};

export type CallData_filter = {
  id?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  functionName?: InputMaybe<Scalars['String']['input']>;
  functionName_not?: InputMaybe<Scalars['String']['input']>;
  functionName_gt?: InputMaybe<Scalars['String']['input']>;
  functionName_lt?: InputMaybe<Scalars['String']['input']>;
  functionName_gte?: InputMaybe<Scalars['String']['input']>;
  functionName_lte?: InputMaybe<Scalars['String']['input']>;
  functionName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  functionName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  functionName_contains?: InputMaybe<Scalars['String']['input']>;
  functionName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  functionName_not_contains?: InputMaybe<Scalars['String']['input']>;
  functionName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  functionName_starts_with?: InputMaybe<Scalars['String']['input']>;
  functionName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  functionName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  functionName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  functionName_ends_with?: InputMaybe<Scalars['String']['input']>;
  functionName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  functionName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  functionName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  params?: InputMaybe<Array<Scalars['String']['input']>>;
  params_not?: InputMaybe<Array<Scalars['String']['input']>>;
  params_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  params_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  params_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  params_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CallData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CallData_filter>>>;
};

export type CallData_orderBy =
  | 'id'
  | 'functionName'
  | 'params';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  callData?: Maybe<CallData>;
  callDatas: Array<CallData>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerycallDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycallDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CallData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CallData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  callData?: Maybe<CallData>;
  callDatas: Array<CallData>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptioncallDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncallDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CallData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CallData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  callData: InContextSdkMethod<Query['callData'], QuerycallDataArgs, MeshContext>,
  /** null **/
  callDatas: InContextSdkMethod<Query['callDatas'], QuerycallDatasArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  callData: InContextSdkMethod<Subscription['callData'], SubscriptioncallDataArgs, MeshContext>,
  /** null **/
  callDatas: InContextSdkMethod<Subscription['callDatas'], SubscriptioncallDatasArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["token"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
