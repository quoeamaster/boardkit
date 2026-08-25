-- parameters setup here
SET @limit = 12;

-- query here
SELECT 
    * 
FROM 
    sales 
ORDER BY 
    sales DESC 
LIMIT @limit;