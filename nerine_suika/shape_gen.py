import cv2
import sys

if len(sys.argv) < 2:
    exit()

char_name = sys.argv[1]
img = cv2.imread('imgs/' + char_name + '_suika.png', -1)
#img = cv2.imread('imgs/' + char_name + '.png', -1)
a = img[:,:,3]

contours, hierarchy = cv2.findContours(a, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_TC89_KCOS)


img_disp = cv2.cvtColor(a, cv2.COLOR_GRAY2BGR)

cv2.drawContours(img_disp, contours, 0, (0, 0, 255), 2)

f = open(char_name + '_shape.js', 'w')
f.write('var ' + char_name + '_vertices = [\n')
cnt = 0
pre_point = None
dist = 30

hull = cv2.convexHull(contours[0])

for point in hull:
    cv2.circle(img_disp, point[0], 3, (0, 255, 0), -1)
    f.write('{x: ' + str(point[0][0]) + ', y: ' + str(point[0][1]) + '},\n')

#for point in contours[0]:
#    if pre_point is None:
#        pre_point = point[0]
#        cv2.circle(img_disp, point[0], 3, (0, 255, 0), -1)
#        f.write('{x: ' + str(point[0][0]) + ', y: ' + str(point[0][1]) + '},\n')
#    else:
#        if (pre_point[0] - point[0][0])**2 + (pre_point[1] - point[0][1])**2 >= dist**2:
#            pre_point = point[0]
#            cv2.circle(img_disp, point[0], 3, (0, 255, 0), -1)
#            f.write('{x: ' + str(point[0][0]) + ', y: ' + str(point[0][1]) + '},\n')

#for point in contours[0]:
#    if cnt % 3 == 0:
#        cv2.circle(img_disp, point[0], 3, (0, 255, 0), -1)
#        f.write('{x: ' + str(point[0][0]) + ', y: ' + str(point[0][1]) + '},\n')
#    cnt = cnt + 1
f.write('];\n')

f.close()

#cv2.imshow("a", a)
cv2.imshow("a", img_disp)
cv2.waitKey(0)
cv2.destroyAllWindows()

