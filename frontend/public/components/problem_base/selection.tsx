'use client'
import { Select } from "antd"
import { problemBaseOptions } from "@/app/Global/problem_related";
import { useState } from "react";

const ProblemBaseSelect = ({onChange}:{onChange: (value: string) => void}) => {
    const filterOption = (input: string, option?: { label: string; value: string }) =>{
        return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    }

    // Function to handle selection change
    const handleSelectChange = (value: string) => {
        onChange(value); // Call the onChange function passed from the parent
    };
    return (<Select
        showSearch
        placeholder="选择题库名称"
        optionFilterProp="children"
        filterOption={filterOption}
        options={problemBaseOptions}
        onChange={handleSelectChange}
    />);
}

export {ProblemBaseSelect}