package com.platzi.jobsearch.api;

import com.platzi.jobsearch.JobPosition;
import com.platzi.jobsearch.JobSearch;
import feign.Headers;
import feign.QueryMap;
import feign.RequestLine;

import java.util.List;
import java.util.Map;

@Headers("Accept: application/json")
public class APIJobs {
    @RequestLine("GET /positions.json")
    public List<JobPosition> jobs(@QueryMap Map<String, Object> queryMap);
}
