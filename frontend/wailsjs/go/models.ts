export namespace main {
	
	export class GetExifParams {
	    image_path: string;
	
	    static createFrom(source: any = {}) {
	        return new GetExifParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.image_path = source["image_path"];
	    }
	}
	export class GetExifResponse {
	    latitude: number;
	    longitude: number;
	    altitude: number;
	    error: string;
	
	    static createFrom(source: any = {}) {
	        return new GetExifResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.latitude = source["latitude"];
	        this.longitude = source["longitude"];
	        this.altitude = source["altitude"];
	        this.error = source["error"];
	    }
	}
	export class SetExifParams {
	    image_path: string;
	    latitude: number;
	    longitude: number;
	
	    static createFrom(source: any = {}) {
	        return new SetExifParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.image_path = source["image_path"];
	        this.latitude = source["latitude"];
	        this.longitude = source["longitude"];
	    }
	}
	export class SetExifResponse {
	    error: string;
	
	    static createFrom(source: any = {}) {
	        return new SetExifResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.error = source["error"];
	    }
	}

}

