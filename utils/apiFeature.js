class APIFeaturs {
    constructor(query, queryString){
        this.query = query,
        this.queryString = queryString
    }
    search(){
            const searchKeyword = this.queryString.search
            ?{
                name:{
                    $regex: this.queryString.search,
                    $options:'i'
                }
            }:
            {};
            this.query = this.query.find({...searchKeyword})
        return this;
    }
    filter(){
        const queryObj = {...this.queryString};
        const excludeObj = ['page','filter','sort','limit'];
        excludeObj.forEach(el => delete queryObj[el]);

        //filtering method 
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        
        // sorting method       

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ');
            console.log(sortBy);
            this.query = this.query.sort(sortBy);
         }else{
             this.query = this.query.sort('-createAt');
         }

         return this;
    }

    fields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ');
            console.log(fields);
            this.query = this.query.select(fields);
        }else{
              this.query = this.query.select('-__v');
        }
        return this;
    }

    pagination(pageLimit){
        const page = this.queryString.page*1 || 1;
        const limits = this.queryString.limit*1 || pageLimit;
        const skip = (page-1) * limits;

        this.query = this.query.skip(skip).limit(limits);
        
        // if(this.queryString.page){
        //     const numTour = await Tour.countDocuments();
        //     if(skip >= numTour) throw new Error('this page is not found!!')
        // }
        return this;
    }
};

module.exports = APIFeaturs;