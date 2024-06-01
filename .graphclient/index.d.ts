import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { MeshHTTPHandler } from '@graphql-mesh/http';
import { ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import type { TokenTypes } from './sources/token/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {
    [key: string]: unknown;
}, K extends keyof T> = {
    [_ in K]?: never;
};
export type Incremental<T> = T | {
    [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: {
        input: string;
        output: string;
    };
    String: {
        input: string;
        output: string;
    };
    Boolean: {
        input: boolean;
        output: boolean;
    };
    Int: {
        input: number;
        output: number;
    };
    Float: {
        input: number;
        output: number;
    };
    BigDecimal: {
        input: any;
        output: any;
    };
    BigInt: {
        input: any;
        output: any;
    };
    Bytes: {
        input: any;
        output: any;
    };
    Int8: {
        input: any;
        output: any;
    };
    Timestamp: {
        input: any;
        output: any;
    };
};
export type Aggregation_interval = 'hour' | 'day';
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
export type CallData_orderBy = 'id' | 'functionName' | 'params';
/** Defines the order direction, either ascending or descending */
export type OrderDirection = 'asc' | 'desc';
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
'allow'
/** If the subgraph has indexing errors, data will be omitted. The default. */
 | 'deny';
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;
export type ResolverTypeWrapper<T> = Promise<T> | T;
export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;
export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export type NextResolverFn<T> = () => Promise<T>;
export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
    Aggregation_interval: Aggregation_interval;
    BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
    BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
    BlockChangedFilter: BlockChangedFilter;
    Block_height: Block_height;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
    Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
    CallData: ResolverTypeWrapper<CallData>;
    CallData_filter: CallData_filter;
    CallData_orderBy: CallData_orderBy;
    Float: ResolverTypeWrapper<Scalars['Float']['output']>;
    ID: ResolverTypeWrapper<Scalars['ID']['output']>;
    Int: ResolverTypeWrapper<Scalars['Int']['output']>;
    Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
    OrderDirection: OrderDirection;
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars['String']['output']>;
    Subscription: ResolverTypeWrapper<{}>;
    Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
    _Block_: ResolverTypeWrapper<_Block_>;
    _Meta_: ResolverTypeWrapper<_Meta_>;
    _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;
/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
    BigDecimal: Scalars['BigDecimal']['output'];
    BigInt: Scalars['BigInt']['output'];
    BlockChangedFilter: BlockChangedFilter;
    Block_height: Block_height;
    Boolean: Scalars['Boolean']['output'];
    Bytes: Scalars['Bytes']['output'];
    CallData: CallData;
    CallData_filter: CallData_filter;
    Float: Scalars['Float']['output'];
    ID: Scalars['ID']['output'];
    Int: Scalars['Int']['output'];
    Int8: Scalars['Int8']['output'];
    Query: {};
    String: Scalars['String']['output'];
    Subscription: {};
    Timestamp: Scalars['Timestamp']['output'];
    _Block_: _Block_;
    _Meta_: _Meta_;
}>;
export type entityDirectiveArgs = {};
export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type subgraphIdDirectiveArgs = {
    id: Scalars['String']['input'];
};
export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type derivedFromDirectiveArgs = {
    field: Scalars['String']['input'];
};
export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
    name: 'BigDecimal';
}
export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
    name: 'BigInt';
}
export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
    name: 'Bytes';
}
export type CallDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CallData'] = ResolversParentTypes['CallData']> = ResolversObject<{
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    functionName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    params?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
    name: 'Int8';
}
export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    callData?: Resolver<Maybe<ResolversTypes['CallData']>, ParentType, ContextType, RequireFields<QuerycallDataArgs, 'id' | 'subgraphError'>>;
    callDatas?: Resolver<Array<ResolversTypes['CallData']>, ParentType, ContextType, RequireFields<QuerycallDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
    _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;
export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
    callData?: SubscriptionResolver<Maybe<ResolversTypes['CallData']>, "callData", ParentType, ContextType, RequireFields<SubscriptioncallDataArgs, 'id' | 'subgraphError'>>;
    callDatas?: SubscriptionResolver<Array<ResolversTypes['CallData']>, "callDatas", ParentType, ContextType, RequireFields<SubscriptioncallDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
    _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;
export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
    name: 'Timestamp';
}
export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
    hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
    number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
    block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
    deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type Resolvers<ContextType = MeshContext> = ResolversObject<{
    BigDecimal?: GraphQLScalarType;
    BigInt?: GraphQLScalarType;
    Bytes?: GraphQLScalarType;
    CallData?: CallDataResolvers<ContextType>;
    Int8?: GraphQLScalarType;
    Query?: QueryResolvers<ContextType>;
    Subscription?: SubscriptionResolvers<ContextType>;
    Timestamp?: GraphQLScalarType;
    _Block_?: _Block_Resolvers<ContextType>;
    _Meta_?: _Meta_Resolvers<ContextType>;
}>;
export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
    entity?: entityDirectiveResolver<any, any, ContextType>;
    subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
    derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;
export type MeshContext = TokenTypes.Context & BaseMeshContext;
export declare const rawServeConfig: YamlConfig.Config['serve'];
export declare function getMeshOptions(): Promise<GetMeshOptions>;
export declare function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext>;
export declare const pollingInterval: any;
export declare function getBuiltGraphClient(): Promise<MeshInstance>;
export declare const execute: ExecuteMeshFn;
export declare const subscribe: SubscribeMeshFn;
export declare function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext): {
    GetCallData(variables?: Exact<{
        [key: string]: never;
    }>, options?: TOperationContext): Promise<GetCallDataQuery>;
};
export type GetCallDataQueryVariables = Exact<{
    [key: string]: never;
}>;
export type GetCallDataQuery = {
    callDatas: Array<Pick<CallData, 'id' | 'functionName' | 'params'>>;
};
export declare const GetCallDataDocument: DocumentNode<GetCallDataQuery, Exact<{
    [key: string]: never;
}>>;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>;
export declare function getSdk<C, E>(requester: Requester<C, E>): {
    GetCallData(variables?: GetCallDataQueryVariables, options?: C): Promise<GetCallDataQuery>;
};
export type Sdk = ReturnType<typeof getSdk>;
