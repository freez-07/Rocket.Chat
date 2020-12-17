export const enum BSONType {
	Double = 1,
	String,
	Object,
	Array,
	BinData,
	/** @deprecated */
	Undefined,
	ObjectId,
	Boolean,
	Date,
	Null,
	Regex,
	/** @deprecated */
	DBPointer,
	JavaScript,
	/** @deprecated */
	Symbol,
	JavaScriptWithScope,
	Int,
	Timestamp,
	Long,
	Decimal,
	MinKey = -1,
	MaxKey = 127,
}

export type FieldExpression<T> = {
	$eq?: T;
	$gt?: T;
	$gte?: T;
	$lt?: T;
	$lte?: T;
	$in?: T[];
	$nin?: T[];
	$ne?: T;
	$exists?: boolean;
	$type?: BSONType[] | BSONType;
	$not?: FieldExpression<T>;
	$expr?: FieldExpression<T>;
	$jsonSchema?: unknown;
	$mod?: number[];
	$regex?: RegExp | string;
	$options?: string;
	$text?: { $search: string; $language?: string; $caseSensitive?: boolean; $diacriticSensitive?: boolean };
	$where?: string | Function;
	$geoIntersects?: unknown;
	$geoWithin?: unknown;
	$near?: unknown;
	$nearSphere?: unknown;
	$all?: T[];
	$elemMatch?: T extends {} ? Query<T> : FieldExpression<T>;
	$size?: number;
	$bitsAllClear?: unknown;
	$bitsAllSet?: unknown;
	$bitsAnyClear?: unknown;
	$bitsAnySet?: unknown;
	$comment?: string;
};

export type Flatten<T> = T extends unknown[] ? T[0] : T;

export type Query<T> = {
	[P in keyof T]?: Flatten<T[P]> | RegExp | FieldExpression<Flatten<T[P]>>
} & {
	$or?: Query<T>[];
	$and?: Query<T>[];
	$nor?: Query<T>[];
}
