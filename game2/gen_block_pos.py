import cv2
import numpy as np

CHECK_GRID_SIZE = 8

img = cv2.imread("mira_cloth_resize.png", -1)
shape = img.shape

height_num = int(shape[0] / CHECK_GRID_SIZE)
width_num = int(shape[1] / CHECK_GRID_SIZE)

block_pos_list = []
for y in range(height_num):
    for x in range(width_num):
        sx = x * CHECK_GRID_SIZE
        sy = y * CHECK_GRID_SIZE
        for i in range(CHECK_GRID_SIZE):
            elist = []
            elist.append(img[sy, sx + i])
            elist.append(img[sy + i, sx])
            elist.append(img[sy + CHECK_GRID_SIZE - 1, sx + i])
            elist.append(img[sy + i, sx + CHECK_GRID_SIZE - 1])
            flag = False
            for e in elist:
                if e[3] != 0:
                    flag = True
            if flag:
                block_pos_list.append([x, y])
                break

f = open('block_pos.js', 'w')
f.write('var CHECK_GRID_SIZE = '+str(CHECK_GRID_SIZE)+';\n')
f.write('var block_pos_list = [\n')
min_x = None
min_y = None
max_x = None
max_y = None
for pos in block_pos_list:
    x = pos[0] * CHECK_GRID_SIZE
    y = pos[1] * CHECK_GRID_SIZE
    if ((min_x is None) or (x < min_x)):
        min_x = x
    if ((min_y is None) or (y < min_y)):
        min_y = y
    if ((max_x is None) or (x > max_x)):
        max_x = x
    if ((max_y is None) or (y > max_y)):
        max_y = y
    cv2.rectangle(img, (x, y), (x + CHECK_GRID_SIZE, y + CHECK_GRID_SIZE), (0, 255, 0), 3)
    f.write('['+str(x)+','+str(y)+'],\n')
f.write(']\n')
f.write('var minmax_xy = [['+str(min_x)+','+str(max_x)+'],['+str(min_y)+','+str(max_y)+']]\n')
cv2.imshow("window", img)
cv2.waitKey(0)
