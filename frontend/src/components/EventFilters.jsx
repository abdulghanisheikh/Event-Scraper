import { useState } from 'react';

const EventFilters=({ onFilterChange })=>{
    const [filters, setFilters] = useState({
        keyword: '',
        city: '',
        startDate: '',
        endDate: ''
    });

    const handleKeywordChange = (e) => {
        const updated = { ...filters, keyword: e.target.value };
        setFilters(updated);
        onFilterChange(updated);
    };

    const handleCityChange = (e) => {
        const updated = { ...filters, city: e.target.value };
        setFilters(updated);
        onFilterChange(updated);
    };

    const handleStartDateChange = (e) => {
        const updated = { ...filters, startDate: e.target.value };
        setFilters(updated);
        onFilterChange(updated);
    };

    const handleEndDateChange = (e) => {
        const updated = { ...filters, endDate: e.target.value };
        setFilters(updated);
        onFilterChange(updated);
    };

    return (
        <div className="event-filters">
            <div className="filter-group">
                <label htmlFor="keyword">Search by Keyword</label>
                <input
                    id="keyword"
                    type="text"
                    placeholder="Search venue, title, description..."
                    value={filters.keyword}
                    onChange={handleKeywordChange}
                />
            </div>

            <div className="filter-group">
                <label htmlFor="city">City</label>
                <input
                    id="city"
                    type="text"
                    placeholder="Enter city"
                    value={filters.city}
                    onChange={handleCityChange}
                />
            </div>

            <div className="filter-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                    id="startDate"
                    type="date"
                    value={filters.startDate}
                    onChange={handleStartDateChange}
                />
            </div>

            <div className="filter-group">
                <label htmlFor="endDate">End Date</label>
                <input
                    id="endDate"
                    type="date"
                    value={filters.endDate}
                    onChange={handleEndDateChange}
                />
            </div>
        </div>
    );
}

export default EventFilters;