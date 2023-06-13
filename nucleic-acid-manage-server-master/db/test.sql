SELECT d.streetname,
       COUNT(DISTINCT n.name) AS tested_count,
       c.count AS total_count
FROM nucleic_info n
JOIN resident d ON n.name = d.name
JOIN stree c ON d.streetname = c.streetname
WHERE n.test_time >= '指定开始时间' AND n.test_time <= '指定结束时间'
GROUP BY d.streetname;
SELECT r.streetname,
       SUM(CASE WHEN n.test_result = '阳性' OR n.test_result = '阴性' THEN 1 ELSE 0 END) AS detected_count,
	COUNT(*) AS total_count
FROM nucleic_info n
JOIN resident r ON n.test_name = r.r_name
WHERE test_time >= '2023-06-01' AND test_time <= '2023-06-15'
GROUP BY r.streetname